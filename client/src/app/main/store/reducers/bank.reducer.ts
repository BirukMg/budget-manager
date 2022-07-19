import { createEntityAdapter, Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { compareDate } from '../../utils/date-compare';
import { Bank } from '../../models/bank.model';
import {
 createBank,
 createBankSuccess,
 createBankFailure,
 getBanks,
 getBanksFailure,
 getBanksSuccess,
 updateBank,
 updateBankSuccess,
 updateBankFailure,
 deleteBank,
 deleteBankFailure,
 deleteBankSuccess
} from '../actions/main.actions';
import { BankState } from '../models/bank-state.model';

export const adapter = createEntityAdapter<Bank>({
  selectId: (model: Bank) => model.id,
  sortComparer: (a, b) => {
    return compareDate(
      new Date(b.created_at as string),
      new Date(a.created_at as string)
    );
  },
});

export const initialState: BankState = adapter.getInitialState({
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  deletingIds: []
});

export const reducer = createReducer(
  initialState,
  on(createBank, (state) => ({ ...state, creating: true })),
  on(createBankSuccess, (state, { result }) => {
    return adapter.upsertOne(result, {
      ...state,
      creating: false,
    });
  }),
  on(createBankFailure, (state) => ({ ...state, creating: false })),
  on(updateBank, (state) => ({ ...state, updating: true })),
  on(updateBankSuccess, (state, { result }) => {
    console.log(result);
    
    const id = result.id as string;
    const update: Update<Bank> = {
      id,
      changes: {
        ...state.entities[id],
        ...result,
      },
    };
    console.log(update);
    
    return adapter.updateOne(update, {
      ...state,
      updating: false,
    });
  }),
  on(updateBankFailure, (state) => ({ ...state, updating: false })),
  on(getBanks, (state) => ({ ...state, loading: true })),
  on(getBanksSuccess, (state, { result }) => {
    return adapter.upsertMany(result, {
      ...state,
      loading: false,
    });
  }),
  on(getBanksFailure, (state) => ({ ...state, loading: false })),
  on(deleteBank, (state) => ({ ...state, deleting: true })),
  on(deleteBankSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      deleting: false,
    });
  }),
  on(deleteBankFailure, (state) => ({ ...state, deleting: false })),
);

export function bankReducer(state?: BankState, action?: Action) {
  return reducer(state, action!);
}
