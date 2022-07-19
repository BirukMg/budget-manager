import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuardService } from '../app/services/main-guard.service';
import { BanksComponent } from './components/banks/banks.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{ path: '', canActivate:[MainGuardService], component: MainComponent , children: [
  { path: '', component: DashboardComponent },
  { path: 'banks', component: BanksComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'profile', component: ProfileComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
