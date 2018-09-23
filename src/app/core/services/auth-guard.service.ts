import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

/*
 * This file is middleware. It makes sure that the user is authenticated before they go to the route that it is applied on.
 */

export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login'); //Redirect to /login. //TODO: Maybe tell the user they were redirected?
      return false;
    }
    return true;
  }
}
