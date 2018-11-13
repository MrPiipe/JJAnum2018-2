import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GaussPartialPivotEliminationPage} from './gauss-partial-pivot-elimination';

@NgModule({
  declarations: [
    GaussPartialPivotEliminationPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussPartialPivotEliminationPage),
    TranslateModule.forChild()
  ],
  exports: [
    GaussPartialPivotEliminationPage
  ]
})
export class GaussPartialPivotEliminationPageModule {}
