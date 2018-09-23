import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./controllers/home/home.component";
import {AuthGuardService} from "./core/auth-guard.service";
import {LoginComponent} from "./controllers/login/login.component";
import {DeauthGuardService} from "./core/deauth-guard.service";
import {LogoutComponent} from "./controllers/logout/logout.component";
import {SignupComponent} from "./controllers/signup/signup.component";
import {PastComponent} from "./controllers/past/past.component";
import {NotFoundComponent} from "./controllers/not-found/not-found.component";
import {DisclaimerComponent} from "./controllers/disclaimer/disclaimer.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DeauthGuardService]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'past',
    component: PastComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
