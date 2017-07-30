import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})


export class AttendancePage {
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
     this.navBar.backButtonClick = (e:UIEvent) => {
            console.log("Back button clicked");
            this.navCtrl.parent.viewCtrl.dismiss();
            // this.navCtrl.pop();
        };
  }

}
