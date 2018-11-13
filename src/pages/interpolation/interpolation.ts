import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'interpolation',
  templateUrl: 'interpolation.html'
})
export class InterpolationPage {
  items: any[];

  constructor(private navCtrl: NavController) {
    this.items = [
      {
        'name': 'Newton',
        'about': 'Direct Methods',
        'state': 'NewtonInterpolationPage'
      },
      {
        'name': 'Lagrange',
        'about': 'Direct Methods',
        'state': 'LagrangePage'
      },
      {
        'name': 'Vandermonde',
        'about': 'Direct Methods',
        'state': 'VandermondePage'
      },
      {
        'name': 'Linear Spline',
        'about': 'Direct Methods',
        'state': 'LinearSplinePage'
      },
      {
        'name': 'Cuadratic Spline',
        'about': 'Factorization of Matrices',
        'state': 'CuadraticSplinePage'
      },
      {
        'name': 'Cubic Spline',
        'about': 'Factorization of Matrices',
        'state': 'CubicSplinePage'
      }
    ];
  }

  openItem(item: any) {
    this.navCtrl.push(item.state);
  }
}
