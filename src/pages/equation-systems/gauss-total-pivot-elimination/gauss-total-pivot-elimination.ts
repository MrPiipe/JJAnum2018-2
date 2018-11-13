import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-gauss-total-pivot-elimination',
  templateUrl: '../factorization-view/factorization-view.html'
})
export class GaussTotalPivotEliminationPage {
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
    this.title = 'Gauss Total Pivot Elimination';
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

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>Matrix A must be invertible</li>
                    </ul>`;
    this.alert.show(title, content);
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

  theoricHelp() {
    const text = `The Gaussian Elimination method with total pivoting has the same characteristics
    of Gaussian Elimination. But with the objective to reduce propagation of error, we
    try to locate into the diagonal all the possible maximum values of the submatrix
    (excluding the column of the independent terms) changing its rows and/or columns.
    For that purpose, in the stage k, first, we create a marks vector using the numbers
    from 1 to n for the unknowns. Then, we have to search the higher value (in
    absolute value) of the submatrix formed by the rows under the row k and the
    columns to the right of the column k. Once we find that higher value, we have to
    change the row and/or column in which that higher value is located with the row
    and/or column k to put that element in the diagonal, not forgetting to change the
    marks values when we needed to change columns.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/total_pivot_elimination/';
    const params = {
      A: this.matrixA,
      b: this.matrixB
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
      this.matrixL = response.L;
      this.matrixU = response.U;
      this.resultArray = response.x;
      this.arrayZ = response.z;
    }
  }
}
