import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import md5 from 'crypto-md5';

import { StudentChangePassword } from '../../interfaces/student-change-password';
import { TeacherChangePassword } from '../../interfaces/teacher-change-password';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LoginPage } from '../login/login';

import { CommonAlertProvider } from '../../providers/common-alert/common-alert';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  isStudent: boolean;
  isTeacher: boolean;
  jsonResult: any;
  studChangePassword: StudentChangePassword = { studentid: '', old_password: '', new_password: '' };
  techerChangePassword: TeacherChangePassword = { teacherid: '', old_password: '', new_password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restapiServiceProvider: RestapiServiceProvider,
    public commonAlertProvider: CommonAlertProvider) {
    this.isStudent = true;
    this.isTeacher = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  };

  postChangePassword(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      console.log("Ok");
      if (this.isStudent) {
        this.studChangePassword.old_password = md5(this.studChangePassword.old_password, 'hex');
        this.studChangePassword.new_password = md5(this.studChangePassword.new_password, 'hex');
        this.changeRequestPassword("change_passwordapi.php/student", this.studChangePassword);
      } else {
        this.techerChangePassword.old_password = md5(this.studChangePassword.old_password, 'hex');
        this.techerChangePassword.new_password = md5(this.studChangePassword.new_password, 'hex');
        this.changeRequestPassword("change_passwordapi.php/teacher", this.techerChangePassword);
      }
    }
  };

  changeRequestPassword(endPoint: any, data: any) {
    this.restapiServiceProvider.postAPICall(endPoint, data).then((result) => {
      this.jsonResult = result;
      if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
        this.commonAlertProvider.showAlert("Done !!", "Your Password is reset, Please Login !!").then((callback) => {
          this.navCtrl.pop();
        });
      } else {
        console.log("Some thing getting wrong");
      }
    });
  };
}
