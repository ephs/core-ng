import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
 * This file is very important. If a service uses the API, it looks at this, period. This file is outside services because i'm too lazy to change the readme.md file lmao.
 */

export class ConfigService {

  apiEndpoint: string = 'https://ephs.club:8443/api/v1/';
  ver: string = 'rel-1.0';

  getAPIURL(){
    return this.apiEndpoint;
  }
  getVer(){
    return this.ver;
  }

}
