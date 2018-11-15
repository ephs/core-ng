import { Component, OnInit, Input } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AuthenticationService} from "../../core/services/authentication.service";
import {AvailableSessions} from "../../core/models/available-sessions";
import {SessionPayload} from "../../core/models/session-payload";
import {SessionsService} from "../../../sessions.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *',
        [
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms',
              animate('550ms ease-out',
                style({opacity: .7, transform: 'translateY(0px)'})))
          ], { optional: true }),
          query(':leave', animate('50ms', style({ opacity: 0 })) ,{
            optional: true
          })
        ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  sessions$: AvailableSessions;
  len: number;
  

  constructor(private auth: AuthenticationService, private sessions: SessionsService) { }

  ngOnInit() {

    this.updateHomeSessions(); //homeSessions is actually 'signed up' sessions (they are displayed on home page)
    this.sessions.getHomeSessions();
    
    setTimeout(() =>
      {
        this.updateHomeSessions();
        
      },
      2000);

  }

  leave(session: SessionPayload) {
    this.len = 0;
    this.sessions$ = null;
    this.sessions.leaveHomeSession(session);
    //this.sessions.getHomeSessions();
    setTimeout(() =>
      {
        this.updateHomeSessions();
      },
      2000);
  }

  updateHomeSessions() {

    if (!(JSON.stringify(this.sessions$) === JSON.stringify(this.sessions.homeSessions$))) { //this is really broken but the only way I got it to compare the arrays

      this.sessions$ = this.sessions.homeSessions$;
      this.len = this.sessions.homeLength;
    } else if (this.sessions.homeSessions$ == undefined) { //if homeSessions$ has not been updated, check again periodically
      setTimeout(() =>
      {
        this.updateHomeSessions();
      },
      2000);
    } 
  }
}
