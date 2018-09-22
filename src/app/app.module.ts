import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './controllers/login/login.component';
import { AvailableComponent } from './controllers/available/available.component';
import { PastComponent } from './controllers/past/past.component';
import { SignupComponent } from './controllers/signup/signup.component';
import { SidebarComponent } from './controllers/sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './controllers/home/home.component';
import { LogoutComponent } from './controllers/logout/logout.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AvailableComponent,
    PastComponent,
    SignupComponent,
    SidebarComponent,
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

