import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Budget } from '../../models/budget.model';
import { deleteBudget } from '../../store/actions/main.actions';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})
export class BudgetItemCardComponent implements OnInit {
  @Input() isIncome!: boolean;
  @Input() budget!: Budget;
  
  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
  }

  updateBudget() {
    this.dialog.open(BudgetFormComponent, {
      width: '600px',
      data : {
        type: this.budget.type,
        data: this.budget
      }
    });
  }

  deleteB(e: Event){
    e.stopPropagation(); 
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure?'
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(deleteBudget({id: this.budget.id}))
      }
    })
  }

}
