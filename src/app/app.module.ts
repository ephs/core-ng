import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './controllers/login/login.component';
import { PastComponent } from './controllers/past/past.component';
import { SignupComponent } from './controllers/signup/signup.component';
import { SidebarComponent } from './controllers/sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './controllers/home/home.component';
import { LogoutComponent } from './controllers/logout/logout.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NotFoundComponent } from './controllers/not-found/not-found.component';
import { DisclaimerComponent } from './controllers/disclaimer/disclaimer.component';
import {OnLoadService} from "./core/services/on-load.service";

import * as Raven from 'raven-js';

Raven
  .config('https://7880ce881f294331a2449df80a3f94c2@sentry.io/1286744')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

export function init_app(onLoad: OnLoadService) {
  return () => onLoad.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PastComponent,
    SignupComponent,
    SidebarComponent,
    HomeComponent,
    LogoutComponent,
    NotFoundComponent,
    DisclaimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [OnLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [OnLoadService], multi: true },
    { provide: ErrorHandler, useClass: RavenErrorHandler}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

