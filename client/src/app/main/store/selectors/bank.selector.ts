import { createSelector } from '@ngrx/store';
import { Bank } from '../../models/bank.model';
import {
  BankFeatureState,
  selectMainFeatureState,
} from '../models/main-feature.state';
import { adapter } from '../reducers/bank.reducer';

export const { selectAll } = adapter.getSelectors();

export const selectBankState = createSelector(
  selectMainFeatureState,
  (state: BankFeatureState) => state.bank
);

export const selectBank = createSelector(selectBankState, selectAll);

export const selectLoadingState = createSelector(
  selectBankState,
  (state) => state.loading
);
export const selectCreatingState = createSelector(
  selectBankState,
  (state) => state.creating
);
export const selectDeletingState = createSelector(
  selectBankState,
  (state) => state.deleting
);
export const selectUpdatingState = createSelector(
  selectBankState,
  (state) => state.updating
);

export const selectBankData = createSelector(selectBank, (banks: Bank[]) => {
  return banks;
});

export const selectBankById = createSelector(
  selectBank,
  (category: Bank[], props: { id: string }) => {
    return category.filter((b) => b.id === props.id)[0];
  }
);
