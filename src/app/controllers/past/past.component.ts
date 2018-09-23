import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../core/services/authentication.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

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
                style({opacity: 1, transform: 'translateY(0px)'})))
          ], { optional: true }),
          query(':leave', animate('50ms', style({ opacity: 0 })) ,{
            optional: true
          })
        ])
    ])
  ]
})
export class PastComponent implements OnInit {

  sessions$: Object;
  len: number;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getPast().subscribe(data => {this.sessions$ = data.sessions; this.len = data.sessions.length;});
  }
}
