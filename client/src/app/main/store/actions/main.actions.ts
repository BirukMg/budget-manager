import { createAction, props } from '@ngrx/store';
import { BankForm } from '../../models/bank-form.mode';
import { Bank } from '../../models/bank.model';
import { BudgetForm } from '../../models/budget-form.model';
import { Budget } from '../../models/budget.model';
import { CategoryFrom } from '../../models/category-form.model';
import { Category } from '../../models/category.model';
import { ErrorMessage } from '../../models/error-message.model';

export const createBank = createAction(
  '[Main] Create Bank',
  props<{ data: BankForm }>()
);

export const createBankSuccess = createAction(
  '[Main] Create Bank Success',
  props<{ result: Bank }>()
);

export const createBankFailure = createAction(
  '[Main] Create Bank Failure',
  props<{ err: ErrorMessage }>()
);

export const updateBank = createAction(
  '[Main] Update Bank',
  props<{ data: BankForm }>()
);

export const updateBankSuccess = createAction(
  '[Main] Update Bank Success',
  props<{ result: BankForm }>()
);

export const updateBankFailure = createAction(
  '[Main] Update Bank Failure',
  props<{ err: ErrorMessage }>()
);

export const getBanks = createAction(
  '[Main] Get Bank'
);

export const getBanksSuccess = createAction(
  '[Main] Get Bank Success',
  props<{ result: Bank[] }>()
);

export const getBanksFailure = createAction(
  '[Main] Get Bank Failure',
  props<{ err: ErrorMessage }>()
);

export const deleteBank = createAction(
  '[Main] Delete Bank',
  props<{ id: string }>()
  );
  
  export const deleteBankSuccess = createAction(
    '[Main] Delete Bank Success',
    props<{ id: string }>()
);

export const deleteBankFailure = createAction(
  '[Main] Delete Bank Failure',
  props<{ err: ErrorMessage }>()
);

export const deleteBudget = createAction(
  '[Main] Delete Budget',
  props<{ id: string }>()
  );
  
  export const deleteBudgetSuccess = createAction(
    '[Main] Delete Budget Success',
    props<{ id: string }>()
);

export const deleteBudgetFailure = createAction(
  '[Main] Delete Budget Failure',
  props<{ err: ErrorMessage }>()
);

export const deleteCategory = createAction(
  '[Main] Delete Category',
  props<{ id: string }>()
  );
  
  export const deleteCategorySuccess = createAction(
    '[Main] Delete Category Success',
    props<{ id: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Main] Delete Category Failure',
  props<{ err: ErrorMessage }>()
);


export const createBudget = createAction(
  '[Main] Create Budget',
  props<{ data: BudgetForm }>()
);

export const createBudgetSuccess = createAction(
  '[Main] Create Budget Success',
  props<{ result: Budget }>()
);

export const createBudgetFailure = createAction(
  '[Main] Create Budget Failure',
  props<{ err: ErrorMessage }>()
);
export const createCategory = createAction(
  '[Main] Create Category',
  props<{ data: CategoryFrom }>()
);

export const createCategorySuccess = createAction(
  '[Main] Create Category Success',
  props<{ result: Category }>()
);

export const createCategoryFailure = createAction(
  '[Main] Create Category Failure',
  props<{ err: ErrorMessage }>()
);

export const getBudgets = createAction(
  '[Main] Get Budgets',
);

export const getBudgetsSuccess = createAction(
  '[Main] Get Budgets Success',
  props<{ result: Budget[] }>()
);

export const getBudgetsFailure = createAction(
  '[Main] Get Budgets Failure',
  props<{ err: ErrorMessage }>()
);
export const getCategories = createAction(
  '[Main] Get Categories',
);

export const getCategoriesSuccess = createAction(
  '[Main] Get Categories Success',
  props<{ result: Category[] }>()
);

export const getCategoriesFailure = createAction(
  '[Main] Get Categories Failure',
  props<{ err: ErrorMessage }>()
);

export const updateBudget = createAction(
  '[Main] Update Budget',
  props<{ data: BudgetForm }>()
);

export const updateBudgetSuccess = createAction(
  '[Main] Update Budget Success',
  props<{ result: Budget }>()
);

export const updateBudgetFailure = createAction(
  '[Main] Update Budget Failure',
  props<{ err: ErrorMessage }>()
);