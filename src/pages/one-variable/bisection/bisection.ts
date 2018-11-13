import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-bisection',
  templateUrl: '../one-variable-view/one-variable-view.html'
})
export class BisectionPage {
  title: string;
  viewFunction: string;
  initialX: string;
  errorChoice: boolean;
  iterations: string;
  tolerance: string;
  enableFinalX: boolean;
  tableTitles: string[];
  table: any[];
  results: any[];
  visibleTable: boolean;
  showResultUser: boolean;
  finalResult: string;
  resultTitles: string[];
  visibleResult: boolean;
  enableTolerance: boolean;
  enableErrorChoice: boolean;
  finalX: string;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Bisection';
    this.enableFinalX = true;
    this.enableTolerance = true;
    this.enableErrorChoice = true;
    this.visibleTable = false;
    this.tableTitles = ['i', 'Xi', 'Xs', 'Xm', 'f(xM)', 'Error'];
  }

  onSubmit() {
    if (!this.viewFunction) {
      this.alert.show('Error', 'f(x) is required');
    } else if (!this.initialX) {
      this.alert.show('Error', 'Initial X is required');
    } else if (!this.tolerance) {
      this.alert.show('Error', 'Delta is required');
    } else if (!this.iterations) {
      this.alert.show('Error', 'Iterations are required');
    } else {
      this.calculate();
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/bisection/';
    const params = {
      fx: this.viewFunction,
      xa: this.initialX,
      xb: this.finalX,
      tole: this.tolerance,
      error_type: this.errorChoice,
      nIters: this.iterations
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  theoricHelp() {
    const text = `Bisection method split initial interval, that have the root function, in two
    subintervals of same size. To select the new interval, the function is evaluated
    with lower limit current interval. Check if the sign of that evaluation is different of
    midpoint evaluation. If sign change then, root is inside first subinterval, so the
    new interval is lower point to midpoint, else new interval is the other: midpoint to
    top point. Do the previous steps repeatedly, the midpoints in each iteration is a
    numerical succession that converge in root search.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>f(x) must be a continuous function</li>
                    <li>Use Incremental searches to find a suitable intial X and final X</li>
                    <li>To find a suitable iterations number use the formula iterations > (log(b-a) - log(tolerance))/2</li>
                    <li>Absolute error's formula is: E = |Xv - Xa|</li>
                    <li>Relative error's formula is: E = |Xv - Xa / Xv| </li>
                    </ul>`;
    this.alert.show(title, content);
  }

  graph() {
    this.navCtrl.push('GrapherPage', {
      viewFunction: this.viewFunction,
      initialX: this.initialX,
      finalX: this.finalX
    })
  }

  private populateTable(response) {
    this.results = response.aproximations;
    this.table = response.iterations;

    if (this.results.length !== 0) {
      this.visibleResult = true;
      this.showResultUser = true;
      this.finalResult = 'An approximation to the root is: ' + this.results;
    } else {
      this.alert.show('Fail', response.error);
    }
  }
}
