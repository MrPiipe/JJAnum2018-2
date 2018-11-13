import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-cuadratic-spline',
  templateUrl: '../interpolation-view/interpolation-view.html'
})
export class CuadraticSplinePage {
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
    this.title = 'Cuadratic Spline';
    this.visibleTable = false;
    this.spline = true;
  }

  theoricHelp() {
    const text = `Quadratic interpolation method is a form of interpolation where a special type of
    piecewise polynomial, called a spline, is determined. the linear spline S 2 , n(x) is a
    continuous function that interpolates the data, this means that:
    S 2 ,n(x) is piecewise quadratic; that is, between consecutive knots xi,
    S 2 ,n(x) is C 1 ; that is, S 2 , n(x) is continuous and has continuous first derivative
    everywhere in the interval [a, b], in particular, at the knots.
    For S 2 ,n(x) to be an interpolatory quadratic spline, we must also have:
    S 2 ,n(x) interpolates the data, that is,
    S 2 ,n(xi) = fi, i = 0, 1, . . . , n`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
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
    const url = 'http://127.0.0.1:8000/rest_api/cuadratic_spline/';
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
