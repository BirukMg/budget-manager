import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { deleteCategory } from '../../store/actions/main.actions';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
  }

  deleteC(){
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure? All budget related to this category will be removed'
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(deleteCategory({id: this.category.id}))
      }
    })
  }

}
