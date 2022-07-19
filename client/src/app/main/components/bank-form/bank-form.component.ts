import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { BankForm } from '../../models/bank-form.mode';
import { Bank } from '../../models/bank.model';
import { createBank, createBankFailure, createBankSuccess, updateBank, updateBankFailure, updateBankSuccess } from '../../store/actions/main.actions';
import { selectBankData, selectCreatingState, selectLoadingState, selectUpdatingState } from '../../store/selectors/bank.selector';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss']
})
export class BankFormComponent implements OnInit {

  form!: FormGroup;
  creating$: Observable<boolean> = this.store.select(pipe(selectCreatingState));
  updating$: Observable<boolean> = this.store.select(pipe(selectUpdatingState));
  banks$: Observable<Bank[]> = this.store.select(pipe(selectBankData));
  constructor(
    public dialogRef: MatDialogRef<BankFormComponent>,
    private fb: FormBuilder,
    private store: Store,
    private actions: Actions,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Bank
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      balance: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        balance: this.data.balance
      })
    }
    this.actions
      .pipe(
        ofType(
          createBankSuccess,
          createBankFailure,
          updateBankSuccess,
          updateBankFailure,
        )
      ).subscribe(res => {
        if (res.type === createBankSuccess.type || res.type === updateBankSuccess.type) {
          this.dialogRef.close();
          this.matSnackBar.open('Bank created successfully', undefined, {
            duration: 2000,
            horizontalPosition: 'center',
          });
        } else if (res.type === createBankFailure.type || res.type === updateBankFailure.type) {
          const {message} = res.err;
          this.matSnackBar.open(message ?? 'Something went wrong', undefined, {
            duration: 2000,
            horizontalPosition: 'center',
          });
        }
      })
  }

  onSubmit() {
    if (this.form.valid) {
      const data: BankForm = {
        name: this.form.get('name')!.value,
        balance: this.form.get('balance')!.value
      }
      if (this.data) {
        data.id = this.data.id
        this.store.dispatch(updateBank({data}));
        return;
      }
      this.store.dispatch(createBank({data}))
    }
  }

}
