import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {LoginGuardService as LoginGuard} from './guards/login-guard.service';
import {AuthGuardService as AuthGuard} from './guards/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'customer/list', component: CustomerComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
