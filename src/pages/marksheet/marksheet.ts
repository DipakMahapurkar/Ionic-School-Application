import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';


@Component({
    selector: 'page-marksheet',
    templateUrl: 'marksheet.html',
})
export class MarksheetPage {
    private jsonResult: any;
    private markSheetListObject: Array<{ id: number, examName: string }> = [
        { id: 1, examName: "Exam1" },
        { id: 2, examName: "Exam2" },
        { id: 3, examName: "Exam3" },
        { id: 4, examName: "Exam4" },
        { id: 5, examName: "Exam5" },
        { id: 6, examName: "Exam6" },
        { id: 7, examName: "Exam7" },
        { id: 8, examName: "Exam8" },
        { id: 9, examName: "Exam9" },
        { id: 10, examName: "Exam10" },
    ];
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
        this.restapiServiceProvider.getAPICall("marksheetapi.php/examlist/?roll_no=" + rollNumber).then((result: any) => {
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
        console.log("Mark sheet data = " + JSON.stringify(item));
    }
}