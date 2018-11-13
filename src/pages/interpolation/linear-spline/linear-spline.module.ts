import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {LinearSplinePage} from './linear-spline';

@NgModule({
  declarations: [
    LinearSplinePage,
  ],
  imports: [
    IonicPageModule.forChild(LinearSplinePage),
    TranslateModule.forChild()
  ],
  exports: [
    LinearSplinePage
  ]
})
export class LinearSplinePageModule {}
