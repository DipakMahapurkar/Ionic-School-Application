import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestapiServiceProvider {
  apiBaseUrl = 'https://reliancelaturpattern.com/schoolapp/api/';
  // apiBaseUrl = 'http://pathatech.com/schoolapp/api/';

  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }

  /*Post api syntax for user login
    @functionName: loginUser(), 
    @parameters: {email: '', password: ''} 
    @password will be entrypted
  */
  postAPICall(endPoint, credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.apiBaseUrl + endPoint, JSON.stringify(credentials), { headers: headers })
        .map((res) => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  /*End Post api syntax for user login*/


  /* Rest API for getting getAPICall list 
    @functionName: getAPICall(), 
    @parameters: none
  */
  getAPICall(endPoint) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.apiBaseUrl + endPoint, { headers: headers })
        .map((res) => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  };
  /* End Rest API for getting getAPICall list */
}
