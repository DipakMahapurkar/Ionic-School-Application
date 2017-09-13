import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';


@Component({
    selector: 'page-homework',
    templateUrl: 'homework.html',
})
export class HomeworkPage {

    jsonResult: any;
    homeworkListObject: any;
    studentId: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomeworkPage');
        this.passDataServiceProvider.getProfile().then((data) => {
            this.studentId = data[0].student_roll_number;
            this.getApplicationList();
        });
    }

    getApplicationList() {
        this.restapiServiceProvider.getAPICall("homeworkapi.php/" + this.studentId).then((result) => {
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.homeworkListObject = this.jsonResult.data;
            } else {
                console.log("Something getting wrong");
            }
        });
    };

}
