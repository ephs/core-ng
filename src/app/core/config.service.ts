import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
 * This file is very important. If a service uses the API, it looks at this, period. This file is outside services because i'm too lazy to change the readme.md file lmao.
 */

export class ConfigService {

  apiEndpoint: string = 'http://localhost:8080/api/v1/';
  ver: string = 'dev-0.2';

  getAPIURL(){
    return this.apiEndpoint;
  }
  getVer(){
    return this.ver;
  }

}
