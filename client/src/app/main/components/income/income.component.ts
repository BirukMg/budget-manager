import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BudgetType } from '../../models/budget-type.enum';
import { Budget } from '../../models/budget.model';
import { getBudgets } from '../../store/actions/main.actions';
import { selectBudgetData } from '../../store/selectors/budget.selector';
import { BudgetFormComponent } from '../budget-form/budget-form.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  budgets$: Observable<Budget[]> = this.store.pipe(select(selectBudgetData, {type: BudgetType.INCOME}));
  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getBudgets())
  }

  addIncome() {
    this.dialog.open(BudgetFormComponent, {
      width: '600px',
      data : {
        type: BudgetType.INCOME,
        data: null
      }
    });
  }

}
