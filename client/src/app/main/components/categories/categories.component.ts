import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BudgetType } from '../../models/budget-type.enum';
import { Category } from '../../models/category.model';
import { getCategories } from '../../store/actions/main.actions';
import { selectCategoryData } from '../../store/selectors/category.selector';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  budgetType = BudgetType;
  income$: Observable<Category[]> = this.store.pipe(select(selectCategoryData, {type: BudgetType.INCOME}));
  expense$: Observable<Category[]> = this.store.pipe(select(selectCategoryData, {type: BudgetType.EXPENSE}));
  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getCategories())
  }

  addCategory(type: BudgetType) {
    this.dialog.open(CategoryFormComponent, {
      width: '600px',
      data: {
        type,
        data: {}
      }
    });
  }

}
