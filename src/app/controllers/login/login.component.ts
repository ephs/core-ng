import { Component, OnInit } from '@angular/core';
import {TokenPayload} from "../../core/models/token-payload";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  loading = false;
  subText = "Start session";

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  resetSub(){
    setTimeout(() =>
      {
        this.subText = "Start session";
      },
      2000);
  }

  login(){
    if(this.loading)
        return;

    this.loading = true;

    if(this.credentials.username === "" || this.credentials.password === ""){
      this.subText = "Invalid login.";
      this.loading = false;
      return;
    }
    this.subText = "Starting session...";

    this.auth.login(this.credentials).subscribe((data) => {
      if(data.error === "true"){
        if(data.error_code === "no_login" || data.error_code === "invalid_login"){
          this.subText = "Invalid login.";
        }else{
          this.subText = "Server error.";
        }
        this.loading = false;
      }else{
        this.router.navigateByUrl('/');
      }
      //console.log(this.auth.getUserDetails());
    }, (err) => {
      this.subText = "Unknown error.";
      this.loading = false;
      console.log(err);
    });
  }

}
