import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { bankReducer } from "../reducers/bank.reducer";
import { budgetReducer } from "../reducers/budget.reducer";
import { categoryReducer } from "../reducers/category.reducer";
import { BankState } from "./bank-state.model";
import { BudgetState } from "./budget-state.model";
import { CategoryState } from "./category-state.model";

export const FEATURE_NAME = 'main';
export const selectMainFeatureState = createFeatureSelector<BankFeatureState>(FEATURE_NAME);

export const reducers: ActionReducerMap<BankFeatureState> = {
  bank: bankReducer,
  budget: budgetReducer,
  category: categoryReducer
};

export interface BankFeatureState {
  bank: BankState;
  budget: BudgetState,
  category: CategoryState
}
