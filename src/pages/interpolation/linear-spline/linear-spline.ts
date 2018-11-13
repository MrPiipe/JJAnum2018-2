import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-linear-spline',
  templateUrl: '../interpolation-view/interpolation-view.html'
})
export class LinearSplinePage {
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
    this.title = 'Linear Spline';
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

  theoricHelp() {
    const text = `Linear interpolation method is a form of interpolation where a special type of
    piecewise polynomial, called a spline, is determined. the linear spline S1,n(x) is a
    continuous function that interpolates the data and is constructed from linear
    functions that are two–point interpolating polynomials`
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
    const url = 'http://127.0.0.1:8000/rest_api/linear_spline/';
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
