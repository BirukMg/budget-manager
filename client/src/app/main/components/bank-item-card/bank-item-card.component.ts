import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Bank } from '../../models/bank.model';
import { deleteBank } from '../../store/actions/main.actions';
import { BankFormComponent } from '../bank-form/bank-form.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-bank-item-card',
  templateUrl: './bank-item-card.component.html',
  styleUrls: ['./bank-item-card.component.scss']
})
export class BankItemCardComponent implements OnInit {
  @Input() bank!: Bank;

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
  }

  update() {
    this.dialog.open(BankFormComponent, {
      width: '600px',
      data: this.bank
    });
  }

  deleteB(e: Event){
    e.stopPropagation();
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure? All budgets related to this bank will be removed'
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(deleteBank({id: this.bank.id}))
      }
    })
  }

}
