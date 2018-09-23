import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DeauthGuardService {

  /*
 * This file is middleware. It makes sure that the user is NOT authenticated before they go to the route that it is applied on.
 */

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
