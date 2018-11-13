import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-gauss-simple-elimination',
  templateUrl: '../factorization-view/factorization-view.html'
})
export class GaussSimpleEliminationPage {
  title: string;
  dimension: number;
  matrix: any;
  matrixA: any;
  matrixB: any;
  matrixL: any;
  matrixU: any;
  resultArray: any;
  arrayZ: any;
  visibleTable: boolean;
  showResultUser: boolean;
  showForm: boolean;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Gauss Simple Elimination';
    this.visibleTable = false;
  }

  onSubmit() {
    if (this.isEmpty(this.matrixA)) {
      this.alert.show('Error', 'Matrix A is required');
    } else if (this.isEmpty(this.matrixB)) {
      this.alert.show('Error', 'Array B is required');
    } else {
      this.calculate();
    }
  }

  isEmpty(object): boolean {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  setupMatrix() {
    this.showForm = true;
    this.matrix = [];
    this.matrixA = {};
    this.matrixB = {};
  
    for (let i = 0; i < this.dimension; i++) {
      this.matrix.push(String(i));
    }
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>Matrix A must be invertible</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/simple_elimination/';
    const params = {
      A: this.matrixA,
      b: this.matrixB
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  theoricHelp() {
    const text = `Given an augmented matrix Ab, the purpose of the Gaussian Elimination is to do
    elementary row operations until we get the equivalent system, in which the
    coefficient matrix is an upper triangular matrix. For that purpose, in the stage k, we
    calculate the multipliers of each row dividing each element of the column k under
    the element in the diagonal by the element of the row k. After that, we change
    every row under the row k for a new row, calculated as
    
    New Row (i) = Row (i) – Multiplier(i)(k)*Row (k)
    
    Once we get the desired upper triangular matrix, regressive substitution is applied
    to solve the system of equations.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  private populateTable(response) {
    if (response.error) {
      this.alert.show('Fail', response.error);
    } else {
      this.showResultUser = true;
      this.matrixL = response.L;
      this.matrixU = response.U;
      this.resultArray = response.x;
      this.arrayZ = response.z;
    }
  }
}
