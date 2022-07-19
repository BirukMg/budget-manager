import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  createBank,
  createBankSuccess,
  createBankFailure,
  getBanks,
  getBanksFailure,
  getBanksSuccess,
  updateBank,
  updateBankFailure,
  updateBankSuccess,
  deleteBank,
  deleteBankFailure,
  deleteBankSuccess,
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  getBudgets,
  getBudgetsFailure,
  getBudgetsSuccess,
  updateBudget,
  updateBudgetSuccess,
  updateBudgetFailure,
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  getCategories,
  getCategoriesFailure,
  getCategoriesSuccess,
  deleteBudget,
  deleteBudgetFailure,
  deleteBudgetSuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
} from '../actions/main.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MainService } from '../../services/main.service';
@Injectable()
export class MainEffect {
  constructor(private actions$: Actions, private mainService: MainService) {}

  createBank$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBank),
      mergeMap(({ data }) => {
        return this.mainService.createBank(data).pipe(
          map((res) => createBankSuccess({ result: res })),
          catchError((err) => {
            return of(createBankFailure({ err: err }));
          })
        );
      })
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategory),
      mergeMap(({ data }) => {
        return this.mainService.createCategory(data).pipe(
          map((res) => createCategorySuccess({ result: res })),
          catchError((err) => {
            return of(createCategoryFailure({ err: err }));
          })
        );
      })
    )
  );

  updateBank$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBank),
      mergeMap(({ data }) => {
        return this.mainService.updateBank(data).pipe(
          map((res) => updateBankSuccess({ result: data })),
          catchError((err) => {
            return of(updateBankFailure({ err: err }));
          })
        );
      })
    )
  );

  updateBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBudget),
      mergeMap(({ data }) => {
        return this.mainService.updateBudget(data).pipe(
          map((res) => updateBudgetSuccess({ result: res })),
          catchError((err) => {
            return of(updateBudgetFailure({ err: err }));
          })
        );
      })
    )
  );

  getBanks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBanks),
      mergeMap(({}) => {
        return this.mainService.getBanks().pipe(
          map((res) => getBanksSuccess({ result: res })),
          catchError((err) => {
            return of(getBanksFailure({ err: err }));
          })
        );
      })
    )
  );

  getBudgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBudgets),
      mergeMap(({}) => {
        return this.mainService.getBudgets().pipe(
          map((res) => getBudgetsSuccess({ result: res })),
          catchError((err) => {
            return of(getBudgetsFailure({ err: err }));
          })
        );
      })
    )
  );
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      mergeMap(({}) => {
        return this.mainService.getCategories().pipe(
          map((res) => getCategoriesSuccess({ result: res })),
          catchError((err) => {
            return of(getCategoriesFailure({ err: err }));
          })
        );
      })
    )
  );

  deleteBank$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBank),
      mergeMap(({ id }) => {
        return this.mainService.deleteBank(id).pipe(
          map(() => deleteBankSuccess({ id: id })),
          catchError((err) => {
            return of(deleteBankFailure({ err: err }));
          })
        );
      })
    )
  );

  deleteBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBudget),
      mergeMap(({ id }) => {
        return this.mainService.deleteBudget(id).pipe(
          map(() => deleteBudgetSuccess({ id: id })),
          catchError((err) => {
            return of(deleteBudgetFailure({ err: err }));
          })
        );
      })
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      mergeMap(({ id }) => {
        return this.mainService.deleteCategory(id).pipe(
          map(() => deleteCategorySuccess({ id: id })),
          catchError((err) => {
            return of(deleteCategoryFailure({ err: err }));
          })
        );
      })
    )
  );

  createBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBudget),
      mergeMap(({ data }) => {
        return this.mainService.createBudget(data).pipe(
          map((res) => createBudgetSuccess({ result: res })),
          catchError((err) => {
            return of(createBudgetFailure({ err: err }));
          })
        );
      })
    )
  );
}
