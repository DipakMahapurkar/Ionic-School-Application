import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import md5 from 'crypto-md5';

import { HomePage } from '../home/home';
import { UserOptions } from '../../interfaces/user-options';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  jsonResult: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restapiServiceProvider: RestapiServiceProvider,
    private passDataServiceProvider: PassDataServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.login.password = md5(this.login.password, 'hex');
      this.loginUser();
    }
  }


  loginUser() {
    this.restapiServiceProvider.loginUser(this.login).then((result) => {
      console.log(result);
      this.jsonResult = result;
      if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
        this.passDataServiceProvider.setProfile(this.jsonResult.data);
        this.navCtrl.push(HomePage, { userData: this.jsonResult.data });
      } else {
        console.log("Something getting wrong");
      }

    }, (err) => {
      console.log(err);
    });
  }
}
