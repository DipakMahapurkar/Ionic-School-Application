import { Injectable } from '@angular/core';
import { AlertController, App } from 'ionic-angular';


@Injectable()
export class AlertProvider {
    constructor(private alertCtrl: AlertController, private app: App) {
        console.log('Hello AlertProvider Provider');
    }

    public presentAlert(title: string, message: string, buttonText: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: buttonText,
                    handler: () => {
                        this.app.getActiveNav().pop();
                    }
                }
            ]
        });
        alert.present();
    }
}
