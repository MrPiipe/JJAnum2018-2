import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {CuadraticSplinePage} from './cuadratic-spline';

@NgModule({
  declarations: [
    CuadraticSplinePage,
  ],
  imports: [
    IonicPageModule.forChild(CuadraticSplinePage),
    TranslateModule.forChild()
  ],
  exports: [
    CuadraticSplinePage
  ]
})
export class CuadraticSplinePageModule {}
