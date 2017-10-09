import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MarkSheetDetailsPage } from '../mark-sheet-details/mark-sheet-details';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';


@Component({
    selector: 'page-marksheet',
    templateUrl: 'marksheet.html',
})
export class MarksheetPage {
    private jsonResult: any;
    private markSheetListObject: any[];
    private studentId: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider,
        private loading: LoadingProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MarksheetPage');
        this.loading.showLoader();
        this.passDataServiceProvider.getProfile().then((data: any) => {
            this.studentId = data[0].student_roll_number;
            this.getStudentMarkList(this.studentId);
        });
    }

    getStudentMarkList(rollNumber: any) {
        this.restapiServiceProvider.getAPICall("marksheetapi.php/examlist/?roll_no=" + "8002").then((result: any) => {
            this.markSheetListObject = [];
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.markSheetListObject = this.jsonResult.data;
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

    getMarkSheet(item: any) {
        item['studentRollNumber'] = this.studentId;
        console.log("Mark sheet data = " + JSON.stringify(item));
        this.passDataServiceProvider.setData(item, "EXAM_DATA");
        this.navCtrl.push(MarkSheetDetailsPage);
    }
}