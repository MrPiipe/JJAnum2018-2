import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {CubicSplinePage} from './cubic-spline';

@NgModule({
  declarations: [
    CubicSplinePage,
  ],
  imports: [
    IonicPageModule.forChild(CubicSplinePage),
    TranslateModule.forChild()
  ],
  exports: [
    CubicSplinePage
  ]
})
export class CubicSplinePageModule {}
