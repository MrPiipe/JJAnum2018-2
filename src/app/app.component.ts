import {Component, ViewChild} from '@angular/core';

import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import {Config, Nav, Platform} from 'ionic-angular';

import {FirstRunPage} from '../pages';


@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Welcome', component: 'WelcomePage'},
    {title: 'Cards', component: 'CardsPage'},
    {title: 'TheoricHelp', component: 'TheoricHelpPage'},
    {title: 'Grapher', component: 'GrapherPage'},
    {title: 'One Variable', component: 'OneVariablePage'},
    {title: 'Incremental Searches', component: 'IncrementalSearchesPage'},
    {title: 'Bisection', component: 'BisectionPage'},
    {title: 'Newton', component: 'NewtonPage'},
    {title: 'FixedPoint', component: 'FixedPointPage'},
    {title: 'FalsePosition', component: 'FalsePositionPage'},
    {title: 'Secant', component: 'SecantPagePage'},
    {title: 'MultipleRoots', component: 'MultipleRootsPage'},
    {title: 'EquationSystemsPage', component: 'EquationSystemsPage'},
    {title: 'Cholesky', component: 'CholeskyPage'},
    {title: 'Doolittle', component: 'DoolittlePage'},
    {title: 'Crout', component: 'CroutPage'},
    {title: 'GaussSimpleFactorization', component: 'GaussSimpleFactorizationPage'},
    {title: 'GaussPartialPivotFactorization', component: 'GaussPartialPivotFactorizationPage'},
    {title: 'GaussSimpleElimination', component: 'GaussSimpleEliminationPage'},
    {title: 'GaussPartialPivotElimination', component: 'GaussPartialPivotEliminationPage'},
    {title: 'GaussTotalPivotElimination', component: 'GaussTotalPivotEliminationPage'},
    {title: 'Jacobi', component: 'JacobiPage'},
    {title: 'Seidel', component: 'SeidelPage'},
    {title: 'SOR', component: 'SorPage'},
    {title: 'Interpolation', component: 'InterpolationPage'},
    {title: 'NewtonInterpolation', component: 'NewtonInterpolationPage'},
    {title: 'Lagrange', component: 'LagrangePage'},
    {title: 'Vandermonde', component: 'VandermondePage'},
    {title: 'Linear Spline', component: 'LinearSplinePage'},
    {title: 'Cuadratic Spline', component: 'CuadraticSplinePage'},
    {title: 'Cubic Spline', component: 'CubicSplinePage'}
  ]

  constructor(private translate: TranslateService, platform: Platform, private config: Config, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
