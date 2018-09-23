import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  login: boolean;
  currentUrl: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
        this.login = this.auth.isLoggedIn();
      }
    });
  }

  ngOnInit() {
    this.login = this.auth.isLoggedIn();
  }

}
