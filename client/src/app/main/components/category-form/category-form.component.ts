import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryFrom } from '../../models/category-form.model';
import { FormDialogModel } from '../../models/form-dialog.model';
import { createCategory } from '../../store/actions/main.actions';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  icons = [
    'fa fa-gift',
    'fa fa-line-chart',
    'fa fa-refresh',
    'fa fa-shopping-bag',
    'fa fa-credit-card',
    'fa fa-trophy',
    'fa fa-shield',
    'fa fa-star',
    'fa fa-birthday-cake',
    'fa fa-book',
    'fa fa-gamepad',
    'fa fa-phone',
    'fa fa-mobile',
  ];
  selectedIcon:string | undefined;
  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogModel,
    private store: Store
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    }); 
  }

  ngOnInit(): void {}

  selectIcon(icon:string) {
    this.selectedIcon = icon;
    this.form.patchValue({
      icon
    });
  }

  onSubmit(){
    if (this.form.valid) {
      const data: CategoryFrom = {
        name: this.form.get('name')!.value,
        icon: this.form.get('icon')!.value,
        type: this.data.type
      }

      this.store.dispatch(createCategory({data}))
    }
  }
}
