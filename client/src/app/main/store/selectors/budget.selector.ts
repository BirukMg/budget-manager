import { createSelector } from '@ngrx/store';
import { Bank } from '../../models/bank.model';
import { BudgetType } from '../../models/budget-type.enum';
import { Budget } from '../../models/budget.model';
import {
  BankFeatureState,
  selectMainFeatureState,
} from '../models/main-feature.state';
import { adapter } from '../reducers/budget.reducer';

export const { selectAll } = adapter.getSelectors();

export const selectBudgetState = createSelector(
  selectMainFeatureState,
  (state: BankFeatureState) => state.budget
);

export const selectBudget = createSelector(selectBudgetState, selectAll);

export const selectLoadingState = createSelector(
  selectBudgetState,
  (state) => state.loading
);
export const selectCreatingState = createSelector(
  selectBudgetState,
  (state) => state.creating
);
export const selectDeletingState = createSelector(
  selectBudgetState,
  (state) => state.deleting
);
export const selectUpdatingState = createSelector(
  selectBudgetState,
  (state) => state.updating
);

export const selectBudgetData = createSelector(selectBudget, (budgets: Budget[], props: {type: BudgetType}) => {
  return budgets.filter(b => b.type === props.type);
});
