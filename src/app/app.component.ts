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
    router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;
        if(route.data.title) {
          this.titleService.setTitle("Core | " + route.data.title);
        }else{
          this.titleService.setTitle("Core");
        }
      }
    });
  }
}
