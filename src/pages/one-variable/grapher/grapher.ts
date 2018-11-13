import {Component, ViewChild, OnInit} from '@angular/core';

import {IonicPage, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js';

import {ApiService} from '../../../providers';
import {AlertService} from '../../../providers/services/alert.service';

@IonicPage()
@Component({
  selector: 'page-grapher',
  templateUrl: 'grapher.html'
})
export class GrapherPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  title: string;
  viewFunction: string;
  initialX: string;
  finalX: string;
  delta: string;
  finalResult: string;

  constructor(private apiService: ApiService, private alert: AlertService, private navParams: NavParams) {
    this.title = 'Grapher';
  }

  ngOnInit() {
    this.viewFunction = this.navParams.get('viewFunction') || '';
    this.initialX = this.navParams.get('initialX') || '';
    this.finalX = this.navParams.get('finalX') || '';
    this.delta = this.navParams.get('delta') || '';
  }

  onSubmit() {
    if (!this.viewFunction) {
      this.alert.show('Error', 'f(x) is required');
    } else if (!this.initialX) {
      this.alert.show('Error', 'Initial X is required');
    } else if (!this.finalX) {
      this.alert.show('Error', 'Final X is required');
    } else if (!this.delta) {
      this.alert.show('Error', 'Delta is required');
    } else {
      this.calculate();
    }
  }

  private calculate() {
    const url = 'http://127.0.0.1:8000/rest_api/plot/';
    const params = {
      inputFunction: this.viewFunction,
      xa: this.initialX,
      xb: this.finalX,
      delta: this.delta
    };
    this.apiService.post(url, params).then(response => {
      this.populateGraph(response);
    });
  }

  help() {
    const title = 'Help';
    const content = `<ul>
                    <li><b>f(x):</b> Function</li>
                    <li><b>Initial X</b> Initial X for the interval</li>
                    <li><b>Final X</b> Final X for the interval</li>
                    <li><b>Delta</b> Delta between each plot point</li>
                    </ul>`;
    this.alert.show(title, content);
  }

  private populateGraph(response) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          data: response.data,
          fill: false,
          borderColor: [
            '#001f51',
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });
  }
}
