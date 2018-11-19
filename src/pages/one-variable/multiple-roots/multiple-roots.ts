import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-newton',
  templateUrl: '../one-variable-view/one-variable-view.html'
})
export class MultipleRootsPage {
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
  enableDoublePrimeFunction: boolean;
  primeFunction: string;
  doublePrimeFunction: string;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Multiple Roots';
    this.enablePrimeFunction = true;
    this.enableDoublePrimeFunction = true;
    this.enableTolerance = true;
    this.enableErrorChoice = true;
    this.visibleTable = false;
    this.tableTitles = ['i', 'Xn', 'f(Xn)', 'Error'];
  }

  theoricHelp() {
    const text = `This method is a variant of Newton’s method to solve equations that have roots
    with critical values (minimum, maximum or inflection). The following expression is
    use to calculate the next Xn.
    Xn+1 = Xn - ( (f(Xn)*f’(Xn)) / ((f(Xn)* f(Xn)) – (f(Xn)*f’’(Xn))) )`
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
      initialX: this.initialX
    })
  }

  onSubmit() {
    if (!this.viewFunction) {
      this.alert.show('Error', 'f(x) is required');
    } else if (!this.primeFunction) {
      this.alert.show('Error', "f'(x) is required");
    } else if (!this.doublePrimeFunction) {
      this.alert.show('Error', "f''(x) is required");
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
    const url = 'http://127.0.0.1:8000/rest_api/multiple_roots/';
    const params = {
      fx: this.viewFunction,
      dfx: this.primeFunction,
      d2fx: this.doublePrimeFunction,
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

    if (this.results !== undefined && this.results.length !== 0) {
      this.visibleResult = true;
      this.showResultUser = true;
      this.finalResult = 'An approximation to the root is: ' + this.results;
    } else {
      if(this.table.length !== 0) {
        this.visibleResult = true;
      }
      this.alert.show('Fail', response.error);
    }
  }
}
