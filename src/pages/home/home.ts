import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public passDataServiceProvider: PassDataServiceProvider) {
  }

  ionViewWillEnter() {
    console.log("in ionViewCanEnter");
   this.passDataServiceProvider.getProfile().then((data) =>{
    this.userData = data[0];
   });
  }
}
