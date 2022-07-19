import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../app/services/guard.service';
import { AuthComponent } from './components/auth.component';

const routes: Routes = [
  { path: '', canActivate: [GuardService], component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
