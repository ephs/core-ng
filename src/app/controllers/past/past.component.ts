import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../core/services/authentication.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {PastSessions} from "../../core/models/past-sessions";
import {SessionsService} from "../../../sessions.service"



@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
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
export class PastComponent implements OnInit {

  sessions$: PastSessions;
  len: number;

  constructor(private auth: AuthenticationService, private sessions: SessionsService) { }

  ngOnInit() {

    this.updatePastSessions();
    this.sessions.getPastSessions();
    
    setTimeout(() =>
      {
        this.updatePastSessions();
      },
      1000);
  }

  updatePastSessions() {

    if (!(JSON.stringify(this.sessions$) === JSON.stringify(this.sessions.pastSessions$))) { //this is really broken but the only way I got it to compare the arrays

      this.sessions$ = this.sessions.pastSessions$;
      this.len = this.sessions.pastLength;
    } else if (this.sessions.pastSessions$ == undefined) { //if pastSessions$ has not been updated, check again periodically
      setTimeout(() =>
      {
        this.updatePastSessions();
      },
      1000);
    } 
  }
}
