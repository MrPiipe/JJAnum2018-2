import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'equation-systems',
  templateUrl: 'equation-systems.html'
})
export class EquationSystemsPage {
  items: any[];

  constructor(private navCtrl: NavController) {
    this.items = [
      {
        'name': 'Gauss Simple Elimination',
        'about': 'Direct Methods',
        'state': 'GaussSimpleEliminationPage'
      },
      {
        'name': 'Gauss Partial Pivot Elimination',
        'about': 'Direct Methods',
        'state': 'GaussPartialPivotEliminationPage'
      },
      {
        'name': 'Gauss Total Pivot Elimination',
        'about': 'Direct Methods',
        'state': 'GaussTotalPivotEliminationPage'
      },
      {
        'name': 'Cholesky',
        'about': 'Factorization of Matrices',
        'state': 'CholeskyPage'
      },
      {
        'name': 'Doolittle',
        'about': 'Factorization of Matrices',
        'state': 'DoolittlePage'
      },
      {
        'name': 'Crout',
        'about': 'Factorization of Matrices',
        'state': 'CroutPage'
      },
      {
        'name': 'Gauss Simple Factorization',
        'about': 'Factorization of Matrices',
        'state': 'GaussSimpleFactorizationPage'
      },
      {
        'name': 'Gauss Partial Pivot Factorization',
        'about': 'Factorization of Matrices',
        'state': 'GaussPartialPivotFactorizationPage'
      },
      {
        'name': 'Jacobi',
        'about': 'Iterative Methods',
        'state': 'JacobiPage'
      },
      {
        'name': 'Seidel',
        'about': 'Iterative Methods',
        'state': 'SeidelPage'
      },
      {
        'name': 'SOR',
        'about': 'Iterative Methods',
        'state': 'SorPage'
      }

    ];
  }

  openItem(item: any) {
    this.navCtrl.push(item.state);
  }
}
