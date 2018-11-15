import { Injectable } from '@angular/core';
import {AvailableSessions} from "./app/core/models/available-sessions";
import {PastSessions} from "./app/core/models/past-sessions";
import {AuthenticationService} from "./app/core/services/authentication.service";
import {SessionPayload} from "./app/core/models/session-payload";


@Injectable({
  providedIn: 'root'
})
export class SessionsService { //this serves as a cache to keep the sessions stored even as you move around tabs

  homeSessions$: AvailableSessions;
  homeLength: number;
  availableSessions$: AvailableSessions;
  availableLength: number;
  pastSessions$: PastSessions;
  pastLength: number;

  constructor(private auth: AuthenticationService) { 
    this.getHomeSessions();
    this.getAvailableSessions();
    this.getPastSessions();
  }

  getHomeSessions () {
  	this.auth.getSignedup().subscribe(data => 
  		{this.homeSessions$ = data.sessions; this.homeLength = data.sessions.length;});
  }

  leaveHomeSession (session: SessionPayload) {
  	    this.auth.leave(session).subscribe(data => 
  	    	{this.auth.getSignedup().subscribe(data => 
  	    		{this.homeSessions$ = data.sessions; this.homeLength = data.sessions.length;})});
  }

  getAvailableSessions () {
  	this.auth.getAvailable().subscribe(data => 
  		{this.availableSessions$ = data.sessions; this.availableLength = data.sessions.length;});
  }

  getPastSessions () {
  	this.auth.getPast().subscribe(data => 
  		{this.pastSessions$ = data.sessions; this.pastLength = data.sessions.length;});
  }
}
