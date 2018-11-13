import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GaussPartialPivotFactorizationPage} from './gauss-partial-pivot-factorization';

@NgModule({
  declarations: [
    GaussPartialPivotFactorizationPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussPartialPivotFactorizationPage),
    TranslateModule.forChild()
  ],
  exports: [
    GaussPartialPivotFactorizationPage
  ]
})
export class GaussPartialPivotFactorizationPageModule {}
