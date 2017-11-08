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
    private studentName: string;
    private examName: string;
    private markSheetObject: any[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider,
        private loading: LoadingProvider) {
    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad MarkSheetDetailsPage');
        this.loading.showLoader();
        this.passDataServiceProvider.getData("EXAM_DATA").then((data: any) => {
            console.log(JSON.stringify(data));
            this.studentName = data.studentName;
            this.examName = data.exam;
            this.getExamDetails(data.studentRollNumber, data.exam);
        });
    }

    getExamDetails(rollNumber: string, examName: string) {
        this.restapiServiceProvider.getAPICall("marksheetapi.php/marksheet?roll_no=" + "8002" + "&exam=" + examName).then((result: any) => {
            this.markSheetObject = [];
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                console.log(JSON.stringify(this.jsonResult));
                this.markSheetObject = this.jsonResult.data;
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