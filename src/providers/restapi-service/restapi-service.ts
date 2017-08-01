import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestapiServiceProvider {
  apiBaseUrl = 'https://reliancelaturpattern.com/schoolapp/api/';

  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }

  /*Post api syntax for user login
    @functionName: loginUser(), 
    @parameters: {email: '', password: ''} 
    @password will be entrypted
  */
  loginUser(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.apiBaseUrl + 'studentapi.php/login', JSON.stringify(credentials), { headers: headers })
        .map((res) => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  /*End Post api syntax for user login*/


  /* Rest API for getting timeline list 
    @functionName: getTimeline(), 
    @parameters: none
  */
  getTimeline() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.apiBaseUrl + 'timelineapi.php', { headers: headers })
        .map((res) => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  /* End Rest API for getting timeline list */


  /* Rest API for getting getAPIClassDivSub list 
    @functionName: getAPIClassDivSub(), 
    @parameters: none
  */
  getAPIClassDivSub(endPoint) {
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
  }
  /* End Rest API for getting getAPIClassDivSub list */

  /*Post api syntax for user login
      @functionName: postStudentApplication(), 
      @parameters: { studentid: '', classid: '', divisionid: '', description: '' }
      @password will be entrypted
    */
  postStudentApplication(applicationData) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.apiBaseUrl + 'applicationapi.php', JSON.stringify(applicationData), { headers: headers })
        .map((res) => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  /*End Post api syntax for user postStudentApplication*/

}
