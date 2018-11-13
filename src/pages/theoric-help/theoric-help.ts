import {Component} from '@angular/core';

import {IonicPage, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-theoric-help',
  templateUrl: 'theoric-help.html'
})
export class TheoricHelpPage {
  title: string;
  text: string;

  constructor(private navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.text = this.navParams.get('text');
  }
}
