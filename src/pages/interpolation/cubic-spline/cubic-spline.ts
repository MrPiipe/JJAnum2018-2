import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-cubic-spline',
  templateUrl: '../interpolation-view/interpolation-view.html'
})
export class CubicSplinePage {
  title: string;
  dimension: number;
  matrix: any;
  resultArray: any;
  visibleTable: boolean;
  showResultUser: boolean;
  showForm: boolean;
  arrayX: any;
  arrayY: any;
  evaluate: number;
  finalResult: any;
  finalEvaluate: any;
  spline: boolean;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Cubic Spline';
    this.visibleTable = false;
    this.spline = true;
  }

  onSubmit() {
    if (this.isEmpty(this.arrayX)) {
      this.alert.show('Error', 'Array X is required');
    } else if (this.isEmpty(this.arrayY)) {
      this.alert.show('Error', 'Array Y is required');
    } else if (!this.evaluate) {
      this.alert.show('Error', 'Evaluate in X is required')
    } else {
      this.calculate();
    }
  }

  isEmpty(object): boolean {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>The value to be evaluated must be inside the interval given</li>
                    <li>Please make sure to fill out the arrays completely with all the necessary values</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  theoricHelp() {
    const text = `Cubic Spline interpolation method is a form of interpolation where a special type of
    piecewise polynomial, called a spline, is determined. Given n+1 points, the Cubic
    Spline interpolation method determines n order-3-polynomials for every interval
    between each pair of points. This method is based in four characteristics: the
    function is continuous, it passes through every given point, the first derivative in the
    connection-points exists and, to preserve the function’s concavity, the second
    derivative is the same in the connection-points. Using this characteristics and
    given n+1 points, a system of equations (4*n)X(4*n) is generated and the result of
    that system after applying the Gaussian Elimination method with total pivoting is a
    vector with (4*n) values, in order, where each value represents the coefficient
    accompanying each term in every piecewise polynomial.
    The general form of every piecewise polynomial is:
    A(i)*(x^3) + B(i)*(x^2) + C(i)*x + D(i) X(i) &lt;= x &lt;= X(i+1)`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  setupMatrix() {
    this.showForm = true;
    this.matrix = [];
    this.arrayX = {};
    this.arrayY = {};
  
    for (let i = 0; i < this.dimension; i++) {
      this.matrix.push(String(i));
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/cubic_spline/';
    const params = {
      X: this.arrayX,
      Y: this.arrayY,
      eval: this.evaluate
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  private populateTable(response) {
    if (response.error) {
      this.alert.show('Fail', response.error);
    } else {
      this.showResultUser = true;
      this.finalResult = response.resultingFunction;
      this.finalEvaluate = response.y_eval;
    }
  }
}
