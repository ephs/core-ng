import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AuthenticationService} from "../../core/services/authentication.service";
import {AvailableSessions} from "../../core/models/available-sessions";

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
                style({opacity: 1, transform: 'translateY(0px)'})))
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
  len: boolean;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getSignedup().subscribe(data => {this.sessions$ = data.sessions; this.len = data.sessions.length;});
  }

}
