import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingProvider {

    loader: any;
    constructor(public loadingCtrl: LoadingController) {
        console.log('Hello LoadingProvider Provider');
    }

    public showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        // Load the loader into the current navController
        this.loader.present();
    }

    public hideLoader() {
        // Load the loader into the current navController
        this.loader.dismiss();
    }
}
