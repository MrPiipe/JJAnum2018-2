import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-gauss-partial-pivot-factorization',
  templateUrl: '../factorization-view/factorization-view.html'
})
export class GaussPartialPivotFactorizationPage {
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
  enableShowTables: boolean;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Gauss Partial Pivot Factorization';
    this.visibleTable = false;
    this.enableShowTables = true;
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

  theoricHelp() {
    const text = `The goal of partial pivoting is to use a permutation matrix to place the largest entry
    of the first column of the matrix at the top of that first column. For an n × n matrix B,
    we scan n rows of the first column for the largest value. At step k of the elimination,
    the pivot we choose is the largest of the n − (k + 1) subdiagonal entries of column
    k, which costs O(nk) operations for each step of the elimination. So for a n×n
    matrix, there is a total of O(n2) comparisons. Once located, this entry is then
    moved into the pivot position Akk on the diagonal of the matrix. So in the first step
    the entry is moved into the (1,1) position of matrix B. We interchange rows by
    multiplying B on the left with a permutation matrix P. After we multiply matrix B by
    P we continue the LU factorization and use our new pivot to clear out the entries
    below it in its column in order to obtain the upper triangular matrix U.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>Matrix A must be invertible</li>
                    </ul>`;
    this.alert.show(title, content);
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

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/partial_pivot_factorization/';
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
