import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "./core/services/authentication.service";
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private titleService: Title) {
    router.events.subscribe(event => { //Check for route change.
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;
        if(route.data.title) { //Check to see if the route is assigned a title
          this.titleService.setTitle("Core | " + route.data.title); //Yes, update the window.title to reflect it.
        }else{
          this.titleService.setTitle("Core"); //No? Well, firstly i must of messed up. Just set it to the default.
        }
      }
    });
  }
}
