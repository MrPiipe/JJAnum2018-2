import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];

  constructor(private navCtrl: NavController) {
    this.cardItems = [
      {
        user: {
          name: 'One Variable Equations'
        },
        nextState: 'OneVariablePage',
        content: 'In this section you can find the methods you need to solve One Variable Equation Problems'
      },
      {
        user: {
          name: 'Systems of Equations'
        },
        nextState: 'EquationSystemsPage',
        content: 'In this section you can find the methods you need to solve System of Equations Problems'
      },
      {
        user: {
          name: 'Interpolation'
        },
        nextState: 'InterpolationPage',
        content: 'In this section you can find the methods you need to solve Interpolation Problems'
      }
    ];

  }

  open(item: any): void {
    this.navCtrl.push(item.nextState);
  }
}
