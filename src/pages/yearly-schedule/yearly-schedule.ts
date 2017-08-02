import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-yearly-schedule',
  templateUrl: 'yearly-schedule.html',
})
export class YearlySchedulePage {
  pdfSrc: String;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YearlySchedulePage');
    this.pdfSrc= 'assets/pdf/yearly_schedule.pdf';
  }

}
