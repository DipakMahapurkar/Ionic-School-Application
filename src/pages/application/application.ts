import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApplicationPostModel } from '../../interfaces/application-model';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';


@Component({
  selector: 'page-application',
  templateUrl: 'application.html',
})
export class ApplicationPage {
  application: ApplicationPostModel = { studentid: '', classid: '', divisionid: '', description: '' };

  jsonResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public passDataServiceProvider: PassDataServiceProvider, private restapiServiceProvider: RestapiServiceProvider) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationPage');
    this.passDataServiceProvider.getProfile().then((data) => {
      this.application.studentid = data[0].student_roll_number;
      this.application.classid = data[0].student_class;
      this.application.divisionid = data[0].student_division;
    });
  };

  postStudentApplication() {
    this.restapiServiceProvider.postStudentApplication(this.application).then((result) => {
      console.log("Application Response = " + JSON.stringify(result));
      this.jsonResult = result;
      if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
        console.log("Submitted Successfully");
      } else {
        console.log("Something getting wrong");
      }
    }, (err) => {
      console.log(err);
    });
  };
}
