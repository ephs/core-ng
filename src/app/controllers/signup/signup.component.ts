import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AvailableSessions} from "../../core/models/available-sessions";
import {SessionPayload} from "../../core/models/session-payload";
import {Router} from "@angular/router";
import {SessionsService} from "../../../sessions.service"


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
  ],
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthenticationService , private router: Router, private sessions: SessionsService) {
  }

  searchText: string;
  sessions$: AvailableSessions;
  len: number;

  ngOnInit() {

    this.updateAvailableSessions();
    this.sessions.getAvailableSessions();
    
    setTimeout(() =>
      {
        this.updateAvailableSessions();
      },
      1000);
  }

  signup(session: SessionPayload){
      this.auth.signup(session).subscribe(data => {this.router.navigateByUrl('/');});
  }

  updateAvailableSessions() {

    if (!(JSON.stringify(this.sessions$) === JSON.stringify(this.sessions.availableSessions$))) { //this is really broken but the only way I got it to compare the arrays

      this.sessions$ = this.sessions.availableSessions$;
      this.len = this.sessions.availableLength;
    } else if (this.sessions.availableSessions$ == undefined) { //if availableSessions$ has not been updated, check again periodically
      setTimeout(() =>
      {
        this.updateAvailableSessions();
      },
      1000);
    } 
  }

}
