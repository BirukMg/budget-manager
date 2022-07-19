import { createEntityAdapter, Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Budget } from '../../models/budget.model';
import { compareDate } from '../../utils/date-compare';
import {
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  deleteBudget,
  deleteBudgetFailure,
  deleteBudgetSuccess,
  getBudgets,
  getBudgetsFailure,
  getBudgetsSuccess,
  updateBudget,
  updateBudgetFailure,
  updateBudgetSuccess
} from '../actions/main.actions';
import { BudgetState } from '../models/budget-state.model';

export const adapter = createEntityAdapter<Budget>({
  selectId: (model: Budget) => model.id,
  sortComparer: (a, b) => {
    return compareDate(
      new Date(b.created_at as string),
      new Date(a.created_at as string)
    );
  },
});

export const initialState: BudgetState = adapter.getInitialState({
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  deletingIds: []
});

export const reducer = createReducer(
  initialState,
  on(createBudget, (state) => ({ ...state, creating: true })),
  on(createBudgetSuccess, (state, { result }) => {
    return adapter.upsertOne(result, {
      ...state,
      creating: false,
    });
  }),
  on(createBudgetFailure, (state) => ({ ...state, creating: false })),
  on(updateBudget, (state) => ({ ...state, updating: true })),
  on(updateBudgetSuccess, (state, { result }) => {
    return adapter.upsertOne(result, {
      ...state,
      updating: false,
    });
  }),
  on(updateBudgetFailure, (state) => ({ ...state, updating: false })),
  on(getBudgets, (state) => ({ ...state, loading: true })),
  on(getBudgetsSuccess, (state, { result }) => {
    return adapter.upsertMany(result, {
      ...state,
      loading: false,
    });
  }),
  on(getBudgetsFailure, (state) => ({ ...state, loading: false })),
  on(deleteBudget, (state) => ({ ...state, deleting: true })),
  on(deleteBudgetSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      deleting: false,
    });
  }),
  on(deleteBudgetFailure, (state) => ({ ...state, deleting: false })),
);

export function budgetReducer(state?: BudgetState, action?: Action) {
  return reducer(state, action!);
}
