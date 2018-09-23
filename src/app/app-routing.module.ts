import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./controllers/home/home.component";
import {AuthGuardService} from "./core/services/auth-guard.service";
import {LoginComponent} from "./controllers/login/login.component";
import {DeauthGuardService} from "./core/services/deauth-guard.service";
import {LogoutComponent} from "./controllers/logout/logout.component";
import {SignupComponent} from "./controllers/signup/signup.component";
import {PastComponent} from "./controllers/past/past.component";
import {NotFoundComponent} from "./controllers/not-found/not-found.component";
import {DisclaimerComponent} from "./controllers/disclaimer/disclaimer.component";

/*
 * APP ROUTES. This is where Angular keeps its routes. You can see all the route titles and activated middleware.
 */

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: {title: "My Sessions"}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DeauthGuardService],
    data: {title: "Login"}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService],
    data: {title: "Logout"}
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardService],
    data: {title: "Signup for Session"}
  },
  {
    path: 'past',
    component: PastComponent,
    canActivate: [AuthGuardService],
    data: {title: "Past Sessions"}
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
    data: {title: "Legal Disclaimer"}
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {title: "Route not found"}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
