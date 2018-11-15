import { Component, OnInit } from '@angular/core';
import {TokenPayload} from "../../core/models/token-payload";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {animate, query, stagger, style, transition, trigger, state} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('submitAnimation', [
      // ...
      state('idle', style({
        backgroundColor: '#bf0127'
      })),
      state('failed', style({
        backgroundColor: '#ff4579'
      })),
      transition('idle => failed', [
        animate('0.5s')
      ]),
      transition('failed => idle', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  loading = false;
  subText = "Login";

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  resetSub(){ //This function will reset the submit button text. This is fired after the user takes their mouse off the button.
    setTimeout(() =>
      {
        this.subText = "Login";
      },
      2000);
  }

  login(){ //Function that is fired when the user clicks dat submit button.
    if(this.loading) //Return if we're loading already
        return;

    this.loading = true;

    if(this.credentials.username === "" || this.credentials.password === ""){ //Locally check if the username or password is blank.
      this.subText = "Invalid login.";
      this.loading = false;
      return;
    }
    this.subText = "Logging in...";

    this.auth.login(this.credentials).subscribe((data) => {
      if(data.error === "true"){
        if(data.error_code === "no_login" || data.error_code === "invalid_login"){
          this.subText = "Invalid login.";
        }else{
          this.subText = "Server error."; //Some weird error returned by the API.
        }
        this.loading = false;
      }else{
        this.router.navigateByUrl('/'); //Good login! Return to dash.
      }
      //console.log(this.auth.getUserDetails());
    }, (err) => {
      this.subText = "Unknown error."; //I don't even know how this code would fire. I'll keep an eye on Sentry.
      this.loading = false;
      console.log(err);
    });
  }

}
