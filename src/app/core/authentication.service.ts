import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetails} from "./user-details";
import {TokenPayload} from "./token-payload";
import {Observable} from "rxjs";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {TokenResponse} from "./token-response";
import {ConfigService} from "./config.service";
import {SessionPayload} from "./session-payload";

/*
 * Pretty sure I got some of the code in here from the book 'Learn Angular: 4 Angular Projects'.
 * Why remake the wheel?
 */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router, private config: ConfigService) { }

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

  private request(method: 'post'|'get', type: 'login'|'sessions/available'|'sessions/signedup'|'sessions/past'|'sessions/signup', user?: TokenPayload, session?: SessionPayload): Observable<any> {
    let base;
    if (method === 'post' && type === 'login') { //We use user to login because it contains the payload we need.
      base = this.http.post(this.config.getAPIURL() + type, user);
    } else if(method === 'post' && type === 'sessions/signup'){
      base = this.http.post(this.config.getAPIURL() + type, session, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else {
      base = this.http.get(this.config.getAPIURL() + type, { headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public getSignedup(): Observable<any> {
    return this.request('get', 'sessions/signedup');
  }

  public getAvailable(): Observable<any> {
    return this.request('get', 'sessions/available');
  }

  public getPast(): Observable<any> {
    return this.request('get', 'sessions/past');
  }


}
