import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { BanksComponent } from './components/banks/banks.component';
import { BudgetItemCardComponent } from './components/budget-item-card/budget-item-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { IncomeComponent } from './components/income/income.component';
import { MainComponent } from './components/main.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainRoutingModule } from './main-routing.module';
import { MainEffect } from './store/effects/main.effect';
import { FEATURE_NAME, reducers } from './store/models/main-feature.state';
import { BankItemCardComponent } from './components/bank-item-card/bank-item-card.component';
import { BankFormComponent } from './components/bank-form/bank-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import {TimeagoModule} from 'ngx-timeago';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';



@NgModule({
  declarations: [
    MainComponent,
    NavBarComponent,
    DashboardComponent,
    BanksComponent,
    CategoriesComponent,
    ProfileComponent,
    IncomeComponent,
    ExpensesComponent,
    BudgetItemCardComponent,
    AddBtnComponent,
    BudgetFormComponent,
    BankItemCardComponent,
    BankFormComponent,
    CategoryFormComponent,
    CategoryCardComponent,
    CustomDatePipe,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([MainEffect]),
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule
  ]
})
export class MainModule { }
