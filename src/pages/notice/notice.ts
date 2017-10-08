import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
    selector: 'page-notice',
    templateUrl: 'notice.html',
})
export class NoticePage {
    private jsonResult: any;
    private noticeList: any[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private loading: LoadingProvider,
        public passDataServiceProvider: PassDataServiceProvider,
        private restapiServiceProvider: RestapiServiceProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NoticePage');
        this.loading.showLoader();
        this.passDataServiceProvider.getProfile().then((data: any) => {             
            this.getStudentNoticeList(data[0].id);
        });
    }

    getStudentNoticeList(id: any) {
        this.restapiServiceProvider.getAPICall("noticeapi.php/" + id).then((result) => {
            this.noticeList = [];            
            this.jsonResult = result;
            if (this.jsonResult.status === 200 && this.jsonResult.status_message.toLowerCase() != "no data") {
                this.noticeList = this.jsonResult.data;                
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
