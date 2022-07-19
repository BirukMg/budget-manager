import { createEntityAdapter, Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Bank } from '../../models/bank.model';
import { Budget } from '../../models/budget.model';
import { Category } from '../../models/category.model';
import { compareDate } from '../../utils/date-compare';
import {
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getBudgets,
  getBudgetsFailure,
  getBudgetsSuccess,
  getCategories,
  getCategoriesFailure,
  getCategoriesSuccess,
  updateBudget,
  updateBudgetFailure,
  updateBudgetSuccess
} from '../actions/main.actions';
import { BudgetState } from '../models/budget-state.model';
import { CategoryState } from '../models/category-state.model';

export const adapter = createEntityAdapter<Category>({
  selectId: (model: Category) => model.id,
  sortComparer: (a, b) => {
    return compareDate(
      new Date(b.created_at as string),
      new Date(a.created_at as string)
    );
  },
});

export const initialState: CategoryState = adapter.getInitialState({
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  deletingIds: []
});

export const reducer = createReducer(
  initialState,
  on(createCategory, (state) => ({ ...state, creating: true })),
  on(createCategorySuccess, (state, { result }) => {
    return adapter.upsertOne(result, {
      ...state,
      creating: false,
    });
  }),
  on(createCategoryFailure, (state) => ({ ...state, creating: false })),
  on(getCategories, (state) => ({ ...state, loading: true })),
  on(getCategoriesSuccess, (state, { result }) => {
    return adapter.upsertMany(result, {
      ...state,
      loading: false,
    });
  }),
  on(getCategoriesFailure, (state) => ({ ...state, loading: false })),
  on(deleteCategory, (state) => ({ ...state, deleting: true })),
  on(deleteCategorySuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      deleting: false,
    });
  }),
  on(deleteCategoryFailure, (state) => ({ ...state, deleting: false })),
);

export function categoryReducer(state?: CategoryState, action?: Action) {
  return reducer(state, action!);
}
