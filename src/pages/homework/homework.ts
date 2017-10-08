import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';


@Component({
    selector: 'page-homework',
    templateUrl: 'homework.html',
})
export class HomeworkPage {
    private jsonResult: any;
    private homeworkListObject: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private loading: LoadingProvider,
        private restapiServiceProvider: RestapiServiceProvider) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomeworkPage');
        this.loading.showLoader();
        this.passDataServiceProvider.getProfile().then((data) => {
            this.getApplicationList(data[0].id);
        });
    }

    getApplicationList(rollNumber: any) {
        this.restapiServiceProvider.getAPICall("homeworkapi.php/" + rollNumber).then((result) => {
            this.homeworkListObject = [];
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.homeworkListObject = this.jsonResult.data;
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
    };
}
