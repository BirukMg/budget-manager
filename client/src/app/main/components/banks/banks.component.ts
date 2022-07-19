import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { Bank } from '../../models/bank.model';
import { getBanks } from '../../store/actions/main.actions';
import { selectBankData } from '../../store/selectors/bank.selector';
import { BankFormComponent } from '../bank-form/bank-form.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {

  banks$: Observable<Bank[]> = this.store.select(pipe(selectBankData));
  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getBanks())
  }

  addBank() {
    this.dialog.open(BankFormComponent, {
      width: '600px',
    });
  }
}
