import {Injectable} from '@angular/core';

import {AlertController} from 'ionic-angular';

@Injectable()
export class AlertService {

  constructor(private alertCtrl: AlertController) {
  }

  show(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['Close']
    });
    alert.present();
  }
}
