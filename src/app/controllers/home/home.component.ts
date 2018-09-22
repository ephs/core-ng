import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AuthenticationService} from "../../core/authentication.service";

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

  sessions$: Object;

  constructor(private titleService: Title, private auth: AuthenticationService) { }

  ngOnInit() {
    this.titleService.setTitle( "Core | Home" );
    this.auth.getSignedup().subscribe(data => this.sessions$ = data);
  }

}
