import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-gauss-partial-pivot-elimination',
  templateUrl: '../factorization-view/factorization-view.html'
})
export class GaussPartialPivotEliminationPage {
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
    this.title = 'Gauss Partial Pivot Elimination';
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

  theoricHelp() {
    const text = `The Gaussian Elimination method with partial pivoting is a variant of Gaussian
    Elimination. But with the objective to reduce propagation of error, we try to locate
    into the diagonal all the possible maximum values of each column of the submatrix
    (excluding the column of the independent terms) changing its rows. For that
    purpose, in the stage k, we have to search the higher value (in absolute value) of
    the column k under the element in the diagonal and change the row in which that
    higher value is located with the row k.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/partial_pivot_elimination/';
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
