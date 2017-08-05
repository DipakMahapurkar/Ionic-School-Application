import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CommonAlertProvider {

  constructor(public alertCtrl: AlertController) {
    console.log('Hello CommonAlertProvider Provider');
  }

  showAlert(title: string, message: string) {
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: title,
        message: message,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "OK",
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      confirm.present();
    });
  }

/*  public Toast = {
    show: (text: string, duration?, position?, closeButton?, btnText?) => {
      this._toastMsg = this._toastCtrl.create({
        message: text,
        duration: duration || closeButton ? null : 3000,
        position: position || 'top',
        showCloseButton: closeButton || false,
        closeButtonText: btnText || 'OK'
      });
      this._toastMsg.present();
    },
    hide() {
      this._toastMsg.dismiss();
    }
  }*/
}
