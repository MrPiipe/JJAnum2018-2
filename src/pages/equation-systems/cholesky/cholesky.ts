import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-cholesky',
  templateUrl: '../factorization-view/factorization-view.html'
})
export class CholeskyPage {
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
    this.title = 'Cholesky';
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

  isEmpty(object): boolean {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>Matrix A must be positively defined</li>
                    <li>Matrix A must be invertible</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  theoricHelp() {
    const text = `The direct factorization method of Cholesky pretends to decompose a matrix A into
    the product of the two matrices L (lower triangular matrix) and U (upper triangular
    matrix), so that LU = A. For that purpose, we begin with one lower triangular matrix
    and with one upper triangular one where the elements different from zero are
    unknown, but with the particularity that the elements of the diagonals of both
    matrices have the same values, so that L[i][i] = U[i][i]. Then, we use the matrix
    multiplication concept to find both matrices unknown elements. Once we have L
    and U, progressive and regressive substitution are applied to solve the system of
    equations.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
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
    const url = 'http://127.0.0.1:8000/rest_api/cholesky/';
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
