import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bank } from '../../models/bank.model';
import { BudgetForm } from '../../models/budget-form.model';
import { BudgetType } from '../../models/budget-type.enum';
import { Budget } from '../../models/budget.model';
import { Category } from '../../models/category.model';
import { FormDialogModel } from '../../models/form-dialog.model';
import {
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  getBanks,
  getCategories,
  updateBudget,
  updateBudgetFailure,
  updateBudgetSuccess,
} from '../../store/actions/main.actions';
import {
  selectBankById,
  selectBankData,
} from '../../store/selectors/bank.selector';
import {
  selectCreatingState,
  selectUpdatingState,
} from '../../store/selectors/budget.selector';
import { selectCategoryData } from '../../store/selectors/category.selector';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit {
  form!: FormGroup;
  banks$: Observable<Bank[]> = this.store.pipe(select(selectBankData));
  categories$!: Observable<Category[]>;
  updating$: Observable<boolean> = this.store.pipe(select(selectUpdatingState));
  creating$: Observable<boolean> = this.store.pipe(select(selectCreatingState));
  selectedBank!: Bank;
  isInsufficient: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<BudgetFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogModel,
    private store: Store,
    private actions: Actions,
    private matSnackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      bank: [''],
      amount: [1, [Validators.required, Validators.min(1)]],
      remark: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data.type === BudgetType.EXPENSE) {
      this.form.valueChanges.subscribe((res) => {
        if (this.selectedBank) {
          console.log(res.amount);
          console.log(this.selectedBank);
          this.isInsufficient = res.amount <= this.selectedBank.balance;
          console.log(this.isInsufficient);
        } 
      });
    }

    this.store.dispatch(getBanks());
    this.store.dispatch(getCategories());
    this.categories$ = this.store.pipe(
      select(selectCategoryData, { type: this.data.type })
    );

    if (this.data.data) {
      const data: Budget = this.data.data;
      this.form.patchValue({
        category: data.category_id,
        bank: data.bank_id,
        amount: data.amount,
        remark: data.remark,
      });
    }

    this.actions
      .pipe(
        ofType(
          createBudgetSuccess,
          createBudgetFailure,
          updateBudgetSuccess,
          updateBudgetFailure
        )
      )
      .subscribe((res) => {
        switch (res.type) {
          case createBudgetSuccess.type:
          case updateBudgetSuccess.type:
            this.dialogRef.close();
            this.matSnackBar.open(
              `Budget ${this.data.data ? 'updated' : 'created'} successfully`,
              undefined,
              {
                duration: 2000,
                horizontalPosition: 'center',
              }
            );
            break;
          case createBudgetFailure.type:
          case updateBudgetFailure.type:
          case updateBudgetFailure.type:
          case createBudgetFailure.type:
            const { message } = res.err;
            this.matSnackBar.open(
              message ?? 'Something went wrong',
              undefined,
              {
                duration: 2000,
                horizontalPosition: 'center',
              }
            );
            break;
          default:
            break;
        }
      });
  }

  selectChange = (id: string) => {
    this.store.pipe(select(selectBankById, { id })).subscribe((res) => {
      this.selectedBank = res;
    });
  };

  onSubmit() {
    if (this.form.valid) {
      const data: BudgetForm = {
        category_id: this.form.get('category')!.value,
        bank_id: this.form.get('bank')!.value,
        amount: this.form.get('amount')!.value,
        remark: this.form.get('remark')!.value,
        type: this.data.type,
      };

      if (this.data.data) {
        data.id = this.data.data.id;
        this.store.dispatch(updateBudget({ data }));
        return;
      }
      this.store.dispatch(createBudget({ data }));
    }
  }
}
