import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DeauthGuardService {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
