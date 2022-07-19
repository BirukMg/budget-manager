import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BudgetType } from '../../models/budget-type.enum';
import { Budget } from '../../models/budget.model';
import { getBudgets } from '../../store/actions/main.actions';
import { selectBudgetData } from '../../store/selectors/budget.selector';
import { BudgetFormComponent } from '../budget-form/budget-form.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  budgets$: Observable<Budget[]> = this.store.pipe(select(selectBudgetData, {type: BudgetType.EXPENSE}));
  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getBudgets())
  }


  addExpense() {
    this.dialog.open(BudgetFormComponent, {
      width: '600px',
      data : {
        type: BudgetType.EXPENSE,
        data: null
      }
    });
  }
}
