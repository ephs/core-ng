import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetails} from "./user-details";
import {TokenPayload} from "./token-payload";
import {Observable} from "rxjs";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {TokenResponse} from "./token-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('session-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('session-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'available'|'signedup'|'past'|'signup', user?: TokenPayload): Observable<any> {
    let base;
    if (method === 'post' && type === 'login') { //We use user to login because it contains the payload we need.
      base = this.http.post(`http://localhost:8080/api/v1/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:8080/api/v1/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }


    const request = base.pipe(

      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data; //Deal with possible errors in login.ts.
      })
    );
    return request;
  }

  //This service is the ONLY service that can make calls to the api with auth.

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('session-token');
    this.router.navigateByUrl('/');
  }

}
