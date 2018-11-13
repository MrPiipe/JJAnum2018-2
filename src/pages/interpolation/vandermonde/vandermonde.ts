import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-vandermonde',
  templateUrl: '../interpolation-view/interpolation-view.html'
})
export class VandermondePage {
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
  vandermonde: boolean;
  vandermondeMatrix: any;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Vandermonde';
    this.visibleTable = false;
    this.vandermonde = true;
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

  theoricHelp() {
    const text = `This method is used to determine the lowest order polynomial that passes through
    some given points (x, f(x)). The polynomial looks like:
    P(x) = L0(x)f(X0) + L1(x)f(X1) + L2(x)f(X2) + … + Ln(x)f(Xn),
    where Lk is calculated as the quotient of the polynomial formed by the
    multiplication of the subtractions between x and the x-coordinate of every given
    point except for the k point, and the multiplication of the subtractions between the
    x-coordinate of the k point and the x-coordinates of every given point except for the
    k point again. So,
    Lk(x) = ((x-X0)(x-X1)…(x-Xk-1)(x-Xk+1)…(x-Xn))/((Xk-X0)(Xk-X1)…(Xk-Xk-1)(Xk-
    Xk+1)…(Xk-Xn))`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>The value to be evaluated must be inside the interval given</li>
                    <li>Please make sure to fill out the arrays completely with all the necessary values</li>
                    </ul>`;
    this.alert.show(title, content);
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
    const url = 'http://127.0.0.1:8000/rest_api/vandermonde/';
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
      this.vandermondeMatrix = response.matrix;
    }
  }
}
