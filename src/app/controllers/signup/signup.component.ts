import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AvailableSessions} from "../../core/models/available-sessions";
import {SessionPayload} from "../../core/models/session-payload";
import {Router} from "@angular/router";

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
                style({opacity: 1, transform: 'translateY(0px)'})))
          ], { optional: true }),
          query(':leave', animate('50ms', style({ opacity: 0 })) ,{
            optional: true
          })
        ])
    ])
  ],
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthenticationService , private router: Router) {
  }

  searchText: string;
  sessions$: AvailableSessions;
  len: number;

  ngOnInit() {
    this.auth.getAvailable().subscribe(data => {
      this.sessions$ = data.sessions;
      this.len = data.sessions.length;
    });

  }

  signup(session: SessionPayload){
    console.log(this.searchText);
      //this.auth.signup(session).subscribe(data => {this.router.navigateByUrl('/');});
  }

}
