import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OnLoadService {

  /*
 * This file is middleware. Not really sure what this is gonna be besides the console thing. Planning on having analytics built in to the API server.
 */

  constructor(private httpClient: HttpClient, private config: ConfigService) {
  }

  init() {
    this.apiCheck().subscribe(data => {
      console.log(
        "%cConnection established to API server. Yay!\n" +
        "\n" +
        "API Server version:                " + data.api_version + "\n" +
        "API Server date:                   " + data.serverDate + "\n" +
        "Server message:                    " + data.helloMessage + "\n\n" +
        "Want to learn more? Join EP Programming Club @ ephs.club", 'background: #ab2828; color: #292727'); //Cool console colors. Not actually supported on all browsers tho.
    });
  }

  private apiCheck(): Observable<any> { //This is actually the only API call that skips through the auth.service.ts file.
    return this.httpClient.get(this.config.getAPIURL() + "onLoad");
  }
}
