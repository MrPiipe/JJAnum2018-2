import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-newton',
  templateUrl: '../one-variable-view/one-variable-view.html'
})
export class NewtonPage {
  title: string;
  viewFunction: string;
  initialX: string;
  errorChoice: boolean;
  iterations: string;
  tolerance: string;
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
  enablePrimeFunction: boolean;
  primeFunction: string;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Newton';
    this.enablePrimeFunction = true;
    this.enableTolerance = true;
    this.enableErrorChoice = true;
    this.visibleTable = false;
    this.tableTitles = ['i', 'Xn', 'f(Xn)', 'Error'];
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

  theoricHelp() {
    const text = `This method conserves all the characteristics and conditions of the fixed-point
    method, except for how g function is calculated.
    In this case, g(x) = x – ( f(x) / f’(x) ). So Xn+1 is calculated as
    Xn+1 = Xn – ( f(Xn) / f’(Xn).`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  graph() {
    this.navCtrl.push('GrapherPage', {
      viewFunction: this.viewFunction,
      initialX: this.initialX
    })
  }

  onSubmit() {
    if (!this.viewFunction) {
      this.alert.show('Error', 'f(x) is required');
    } else if (!this.initialX) {
      this.alert.show('Error', 'Initial X is required');
    } else if (!this.tolerance) {
      this.alert.show('Error', 'Tolerance is required');
    } else if (!this.iterations) {
      this.alert.show('Error', 'Iterations are required');
    } else if (!this.errorChoice) {
      this.alert.show('Error', 'Please Choose an Error Type');
    } else {
      this.calculate();
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/newton/';
    const params = {
      fx: this.viewFunction,
      dfx: this.primeFunction,
      x0: this.initialX,
      tol: this.tolerance,
      error_type: this.errorChoice,
      nIters: this.iterations
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  private populateTable(response) {
    this.results = response.aproximation;
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
