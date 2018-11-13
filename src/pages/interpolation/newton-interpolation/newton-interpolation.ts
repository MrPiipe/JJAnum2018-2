import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-newton-interpolation',
  templateUrl: '../interpolation-view/interpolation-view.html'
})
export class NewtonInterpolationPage {
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

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Newton';
    this.visibleTable = false;
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
    const text = `This method is used to determine the polynomial that passes through some
    given points (x, f(x)). The Newton´s interpolation method uses the concept of
    divided differences. The divided differences allow us to calculate several of the
    desired polynomial, because we use the given points incrementally to obtain an
    interpolating polynomial of different order in each step. The interpolating
    polynomial would look like:
    P(x) = f[X0] + f[X0, x1](x-X0) + f[X0, X1, X2](x-X0)(x-X1)+…+f[X0, X1, X2,
    X3,…, Xn](x-X0)(x-X1)…(x-Xn-1),
    where the k+1 divided difference is an approximation to the derivative of the k
    divided difference evaluated in Xk. So,
    f[Xk, Xk+1] = (f[Xk+1] – f[Xk]) / (Xk+1 – Xk) = (f(Xk+1) – f(Xk)) / (Xk+1 – Xk)`
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
    const url = 'http://127.0.0.1:8000/rest_api/newton_interpolation/';
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
