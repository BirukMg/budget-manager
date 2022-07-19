import { createSelector } from '@ngrx/store';
import { Bank } from '../../models/bank.model';
import { BudgetType } from '../../models/budget-type.enum';
import { Category } from '../../models/category.model';
import {
  BankFeatureState,
  selectMainFeatureState,
} from '../models/main-feature.state';
import { adapter } from '../reducers/category.reducer';

export const { selectAll } = adapter.getSelectors();

export const selectCategoryState = createSelector(
  selectMainFeatureState,
  (state: BankFeatureState) => state.category
);

export const selectCategory = createSelector(selectCategoryState, selectAll);

export const selectLoadingState = createSelector(
  selectCategoryState,
  (state) => state.loading
);
export const selectCreatingState = createSelector(
  selectCategoryState,
  (state) => state.creating
);
export const selectDeletingState = createSelector(
  selectCategoryState,
  (state) => state.deleting
);
export const selectUpdatingState = createSelector(
  selectCategoryState,
  (state) => state.updating
);

export const selectCategoryData = createSelector(selectCategory, (category: Category[], props: {type: BudgetType}) => {
  return category.filter(b => b.type === props.type);
});
