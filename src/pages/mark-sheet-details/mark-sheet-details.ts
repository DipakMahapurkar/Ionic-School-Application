import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';


@Component({
    selector: 'page-mark-sheet-details',
    templateUrl: 'mark-sheet-details.html',
})
export class MarkSheetDetailsPage {
    public jsonResult: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider,
        private loading: LoadingProvider) {
    }



    ionViewCanEnter() {
        console.log("in ionViewCanEnter")
        return new Promise((resolve, reject) => {
            if (this.navParams.get('fail')) {
                reject(true);
            } else {
                this.loading.showLoader();
                this.passDataServiceProvider.getData("EXAM_DATA").then((data: any) => {
                    console.log(JSON.stringify(data));
                    this.getExamDetails(data.studentRollNumber, data.exam);
                });
            }
        });
    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad MarkSheetDetailsPage');
    }

    getExamDetails(rollNumber: string, examName: string) {
        this.restapiServiceProvider.getAPICall("marksheetapi.php/marksheet?roll_no=" + rollNumber + "&exam=" + examName).then((result: any) => {
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                console.log(JSON.stringify(this.jsonResult));
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
}
