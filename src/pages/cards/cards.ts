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
        image: 'assets/img/advance-card-bttf.png',
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.'
      },
      {
        user: {
          name: 'Systems of Equations'
        },
        nextState: 'EquationSystemsPage',
        image: 'assets/img/advance-card-tmntr.jpg',
        content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
      },
      {
        user: {
          name: 'Interpolation'
        },
        nextState: 'InterpolationPage',
        image: 'assets/img/advance-card-jp.jpg',
        content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
      }
    ];

  }

  open(item: any): void {
    this.navCtrl.push(item.nextState);
  }
}
