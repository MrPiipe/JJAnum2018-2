import {Component} from '@angular/core';

import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {Item} from '../../models/item';
import {Items} from '../../providers';

@IonicPage()
@Component({
  selector: 'one-variable',
  templateUrl: 'one-variable.html'
})
export class OneVariablePage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  ionViewDidLoad() {
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
