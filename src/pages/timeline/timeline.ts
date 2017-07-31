import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  private jsonResult: any;
  private timelines: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restapiServiceProvider: RestapiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
    this.restapiServiceProvider.getTimeline().then((result) => {
      this.jsonResult = result;
      if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
        this.timelines = this.jsonResult.data;
      } else {
        console.log("Something getting wrong");
      }
    });
  }
}
