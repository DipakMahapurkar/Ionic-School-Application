import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApplicationPostModel } from '../../interfaces/application-model';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';


@Component({
    selector: 'page-application',
    templateUrl: 'application.html',
})
export class ApplicationPage {
    isStudent: boolean;
    application: ApplicationPostModel = { studentid: '', classid: '', divisionid: '', description: '' };

    jsonResult: any;
    applicationListObject: any[];
    teacherId: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider,
        private loading: LoadingProvider,
        private alert: AlertProvider) {
        this.isStudent = true;
    };

    ionViewDidLoad() {
        console.log('ionViewDidLoad ApplicationPage');
        this.passDataServiceProvider.getProfile().then((data) => {
            this.application.studentid = data[0].student_roll_number;
            this.application.classid = data[0].student_class;
            this.application.divisionid = data[0].student_division;
        });
    };

    ionViewWillLoad() {
        if (!this.isStudent) {
            this.getApplicationList();
        }
    };

    getApplicationList() {
        this.loading.showLoader();
        this.restapiServiceProvider.getAPICall("applicationapi.php/" + "1").then((result) => {
            this.applicationListObject = [];
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.applicationListObject = this.jsonResult.data;
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

    postStudentApplication() {
        this.loading.showLoader();
        this.restapiServiceProvider.postAPICall('applicationapi.php', this.application).then((result) => {
            console.log("Application Response = " + JSON.stringify(result));
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                console.log("Submitted Successfully");
                this.alert.presentAlert('Success', 'The Application Submitted Successfully !!', 'OK');
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
