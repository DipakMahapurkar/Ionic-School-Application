import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
    selector: 'page-timetable',
    templateUrl: 'timetable.html',
})
export class TimetablePage {

    private BASE_URL: String = 'https://reliancelaturpattern.com/schoolapp/api/';

    pdfSrc: String;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private loading: LoadingProvider,
        public passDataServiceProvider: PassDataServiceProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TimetablePage');
        this.loading.showLoader();
        this.passDataServiceProvider.getProfile().then((data: any) => {
            this.pdfSrc = this.BASE_URL + 'uploads/' + data[0].student_class + '/' + String.fromCharCode(65 + (+data[0].student_division));
            setTimeout(() => {
                this.loading.hideLoader();
            }, 1000);
        });
    }
}
