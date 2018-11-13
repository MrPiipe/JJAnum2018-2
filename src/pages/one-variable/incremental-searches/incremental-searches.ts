import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-incremental-searches',
  templateUrl: '../one-variable-view/one-variable-view.html'
})
export class IncrementalSearchesPage {
  title: string;
  viewFunction: string;
  initialX: string;
  iterations: string;
  enableDelta: boolean;
  delta: string;
  tableTitles: string[];
  table: any[];
  results: any[];
  visibleTable: boolean;
  showResultUser: boolean;
  finalResult: string;
  resultTitles: string[];
  visibleResult: boolean;
  visibleResultTable: boolean;

  constructor(private apiService: ApiService, private alert: AlertService, private navCtrl: NavController) {
    this.title = 'Incremental Searches';
    this.enableDelta = true;
    this.visibleTable = false;
    this.tableTitles = ['i', 'x1', 'x2'];
    this.resultTitles = ['x1', 'x2'];
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li>f(x) must be a continuous function</li>
                    <li>If f(x) is defined in the interval and meets the criteria of f(a) * f(b) < 0, an Xm exists in the interval that is a root of the function</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  graph() {
    this.navCtrl.push('GrapherPage', {
      viewFunction: this.viewFunction,
      initialX: this.initialX
    })
  }

  theoricHelp() {
    const text = `The aim of the method is to find an interval containing at least one root of a
    particular function. The function is evaluated in an initial point and in that same
    point plus a delta. If one of the evaluations is negative and the other is positive, we
    can ensure that there is a root between those points.`
    this.navCtrl.push('TheoricHelpPage', {
      title: this.title,
      text
    })
  }

  onSubmit() {
    if (!this.viewFunction) {
      this.alert.show('Error', 'f(x) is required');
    } else if (!this.initialX) {
      this.alert.show('Error', 'Initial X is required');
    } else if (!this.delta) {
      this.alert.show('Error', 'Delta is required');
    } else if (!this.iterations) {
      this.alert.show('Error', 'Iterations are required');
    } else {
      this.calculate();
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/inc_search/';
    const params = {
      fx: this.viewFunction,
      x0: this.initialX,
      delta: this.delta,
      nIters: this.iterations 
    };
    this.apiService.post(url, params).then(response => {
      this.populateTable(response);
    });
  }

  private populateTable(response) {
    this.results = response.intervals;
    this.table = response.iterations;

    if (this.results.length !== 0) {
      this.visibleResult = true;
      this.visibleResultTable = true;
      this.showResultUser = true;
      if (this.results.length === 1) {
        this.finalResult = 'Root was found';
      } else {
        this.finalResult = this.results.length + ' Roots were found';
      }
    } else {
      this.alert.show('Fail', response.error);
    }
  }
}
