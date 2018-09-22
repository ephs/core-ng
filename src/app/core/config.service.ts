import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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
