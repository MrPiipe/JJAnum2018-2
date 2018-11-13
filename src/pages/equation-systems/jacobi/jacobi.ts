import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-jacobi',
  templateUrl: '../iterative-view/iterative-view.html'
})
export class JacobiPage {
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
  matrixX0: any;
  tolerance: any;
  iterations: any;
  showForm: boolean;
  results: any;
  table: any;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Jacobi';
    this.visibleTable = false;
  }

  onSubmit() {
    if (this.isEmpty(this.matrixA)) {
      this.alert.show('Error', 'Matrix A is required');
    } else if (this.isEmpty(this.matrixB)) {
      this.alert.show('Error', 'Array B is required');
    } else if (this.isEmpty(this.matrixX0)) {
      this.alert.show('Error', 'Array B is required');
    } else if (!this.tolerance) {
      this.alert.show('Error', 'Tolerance is required')
    } else if (!this.iterations) {
      this.alert.show('Error', 'Iterations is required')
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
                    <li>The Spectral Radius of T must be less than 1</li>
                    <li>The norm used on T must be less than 1</li>
                    <li>The norm used to calculate dispersion is norm 2</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  setupMatrix() {
    this.showForm = true;
    this.matrix = [];
    this.matrixA = {};
    this.matrixB = {};
    this.matrixX0 = {};
  
    for (let i = 0; i < this.dimension; i++) {
      this.matrix.push(String(i));
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/jacobi/';
    const params = {
      A: this.matrixA,
      b: this.matrixB,
      x0: this.matrixX0,
      tole: this.tolerance,
      niter: this.iterations
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  theoricHelp() {
    const text = `This method is based on the Fixed Point method. That means that with an initial
    approximation of the solution, we can generate other approximations nearer to
    the real values of the variables. The Jacobi method is an iterative algorithm for
    determining the solutions of a system of linear equations. For the execution of
    the method, first we try to convert the given A matrix to a diagonal dominant one
    moving its rows and columns. Then, we take each equation and put the
    diagonal variable in terms of the other variables. After that, we have to assign
    initial values to the variables and find the first approximation of each one using
    the cleared equations. We continue replacing the values of the previous
    iterations in the mentioned equations to generate more approximations to the
    real solution until we reach the permitted tolerance. The method stops when the
    higher value of the dispersion (in absolute value) is less than the tolerance. One
    feature of this method is that it works simultaneously and independently, that
    means that in every iteration the whole new approximations are calculated
    using only the previous ones.
    Remember that the Alfa value is used to obtain or to improve the system’s
    convergence. For non-relaxation use Alfa = 1; to obtain the convergence of
    non-convergent systems use Alfa between 0 and 1; and to accelerate the
    convergence of convergent but slow systems use Alfa between 1 and 2.`
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
      this.results = response.aproximations[0];
      this.table = response.iterations;
    }
  }
}
