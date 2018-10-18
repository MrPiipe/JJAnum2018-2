import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(private navCtrl: NavController) {}

  enter(): void {
    this.navCtrl.push('CardsPage');
  }
}
