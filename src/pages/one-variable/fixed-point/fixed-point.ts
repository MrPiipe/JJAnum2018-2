import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-fixed-point',
  templateUrl: '../one-variable-view/one-variable-view.html'
})
export class FixedPointPage {
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
  fixedPoint: boolean;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Fixed Point';
    this.enableTolerance = true;
    this.enableErrorChoice = true;
    this.visibleTable = false;
    this.tableTitles = ['i', 'Xi', 'Error'];
    this.fixedPoint = true;
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

  theoricHelp() {
    const text = `When given a function f(x)= 0, we need to isolate one of its variables to get a
    function x = g(x). Then we give an initial point that seems to be near a root of
    the function f(x) and call it X0. To calculate X1 we need to evaluate g(x) in X0,
    to calculate X2 we need to evaluate g(x) in X1, and so on until we find a value
    where Xn+1=g(Xn).`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/fixed_point/';
    const params = {
      fx: this.viewFunction,
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
      if (this.table.length !== 0) {
        this.visibleResult = true;
      }
      this.alert.show('Fail', response.error);
    }
  }
}
