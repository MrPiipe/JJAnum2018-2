import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'one-variable',
  templateUrl: 'one-variable.html'
})
export class OneVariablePage {
  items: any[];

  constructor(private navCtrl: NavController) {
    this.items = [
      {
        'name': 'Incremental Searches',
        'about': 'Method to Obtain Initial Values',
        'state': 'IncrementalSearchesPage'
      },
      {
        'name': 'Bisection',
        'about': 'Method by Intervals',
        'state': 'BisectionPage'
      },
      {
        'name': 'False Position',
        'about': 'Method by Intervals',
        'state': 'FalsePositionPage'
      },
      {
        'name': 'Fixed Point',
        'about': 'Open Iterative Method',
        'state': 'FixedPointPage'
      },
      {
        'name': 'Newton',
        'about': 'Open Iterative Method',
        'state': 'NewtonPage'
      },
      {
        'name': 'Secant',
        'about': 'Open Iterative Method',
        'state': 'SecantPage'
      },
      {
        'name': 'Multiple Roots',
        'about': 'Open Iterative Method',
        'state': 'MultipleRootsPage'
      }
    ];
  }

  openItem(item: any) {
    this.navCtrl.push(item.state);
  }
}
