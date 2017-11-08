import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddTimelinePage } from '../add-timeline/add-timeline';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
    selector: 'page-timeline',
    templateUrl: 'timeline.html',
})
export class TimelinePage {
    private jsonResult: any;
    private timelines: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private loading: LoadingProvider, public restapiServiceProvider: RestapiServiceProvider) {
    }

    ionViewDidLoad() {
        this.loading.showLoader();
        this.timelines = [];
        console.log('ionViewDidLoad TimelinePage');
        this.restapiServiceProvider.getAPICall('timelineapi.php').then((result) => {
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.timelines = this.jsonResult.data;
            } else {
                console.log("Something getting wrong");
            }
            setTimeout(() => {
                this.loading.hideLoader();
            }, 1000);
        }, (err) => {
            console.log(err);
            setTimeout(() => {
                this.loading.hideLoader();
            }, 1000);
        });
    }

    addTimeLine() {
        this.navCtrl.push(AddTimelinePage);
    }
}
