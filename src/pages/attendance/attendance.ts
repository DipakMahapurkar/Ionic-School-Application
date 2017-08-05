import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})


export class AttendancePage {
  studentRollNumber: any;
  jsonResult: any;
  attendanceListObject: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public passDataServiceProvider: PassDataServiceProvider,
    private restapiServiceProvider: RestapiServiceProvider,
    private loading: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.loading.showLoader();
    console.log('ionViewDidLoad AttendancePage');
    this.passDataServiceProvider.getProfile().then((data) => {
      this.studentRollNumber = data[0].student_roll_number;
      this.getAttendanceReport();
    });
  };

  getAttendanceReport() {
    this.restapiServiceProvider.getAPICall("attendence_class.php/getAttendenceforapp/?roll_no=" + this.studentRollNumber).then((result) => {
      this.jsonResult = result;
      if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
        this.attendanceListObject = this.jsonResult.data;
        setTimeout(() => {
          this.loading.hideLoader();
        }, 1000);
      } else {
        console.log("Something getting wrong");
        setTimeout(() => {
          this.loading.hideLoader();
        }, 1000);
      }
    });
  }
}
