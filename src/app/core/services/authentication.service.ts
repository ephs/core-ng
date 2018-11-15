import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetails} from "../models/user-details";
import {TokenPayload} from "../models/token-payload";
import {Observable} from "rxjs";
import {map, filter, catchError, mergeMap} from 'rxjs/operators';
import {TokenResponse} from "../models/token-response";
import {ConfigService} from "../config.service";
import {SessionPayload} from "../models/session-payload";

/*
 * Pretty sure I got some of the code in here from the book 'Learn Angular: 4 Angular Projects'.
 * Why remake the wheel?
 */

@Injectable({
  providedIn: 'root'
})

/*
 * This file is very important. It deals with almost all the API calls. It will keep track of the user session and give it to the API.
 */

export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router, private config: ConfigService) {
  }

  private saveToken(token: string): void { //Save token to local storage.
    localStorage.setItem('session-token', token);
    this.token = token; //Set cached copy.
  }

  private getToken(): string {
    if (!this.token) { //Check to see if we already have a token in memory. If we don't, load it.
      this.token = localStorage.getItem('session-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1]; //Get the data out of the stored JWT payload and read it.
      payload = window.atob(payload);
      return JSON.parse(payload); //Its JSON btw
    } else {
      return null; //Why would I call this without auth smh
    }
  }

  public isLoggedIn(): boolean { //Checks for session token. Then validates it.
    const user = this.getUserDetails(); //Maybe a lil overkill
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  //Holy... We need to provide a request method (POST or GET) and provide a preset route to be called. We also might need to specify some payload if we're logging in or joining/leaving a session.
  private request(method: 'post' | 'get', type: 'login' | 'sessions/available' | 'sessions/signedup' | 'sessions/past' | 'sessions/signup' | 'sessions/leave' ,
                  user?: TokenPayload, session?: SessionPayload): Observable<any> {
    let base;
    if (method === 'post' && type === 'login') { //Check and see if we are logging in. If we are' provide the auth payload
      base = this.http.post(this.config.getAPIURL() + type, user);
    } else if (method === 'post' && (type === 'sessions/signup' || type === 'sessions/leave' )) { //Check if we're doing something with sessions that requires the payload. //TODO add API call for leaving a session
      base = this.http.post(this.config.getAPIURL() + type, session, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    } else {
      base = this.http.get(this.config.getAPIURL() + type, {headers: {Authorization: `Bearer ${this.getToken()}`}}); //Well, its probably some lame call that only needs auth.
    }
    const request = base.pipe(
      map((data: any) => { //We could have a lot of data coming in. So I set this to any. Might be a mistake.
        if (type === 'login') { //Verify we called login.
          if (data.token) { //Looks like we're being returned an auth token. Store it!
            this.saveToken(data.token);
          }
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

  public signup(session: SessionPayload): Observable<any> {
    return this.request('post', 'sessions/signup', undefined, session);
  }

  public leave(session: SessionPayload): Observable<any> {
    return this.request('post', 'sessions/leave', undefined, session);
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
