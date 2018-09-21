import { Component, OnInit } from '@angular/core';
import {TokenPayload} from "../token-payload";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

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

  login(){
    this.auth.login(this.credentials).subscribe((data) => {
      if(data.error === "true"){
        if(data.error_code === "no_login" || data.error_code === "invalid_login"){
          console.log("invalid login!");
          this.subText = "Invalid login.";
        }
      }else{
        this.router.navigateByUrl('/');
      }
      //console.log(this.auth.getUserDetails());
    }, (err) => {
      console.error(err);
    });
  }

}
