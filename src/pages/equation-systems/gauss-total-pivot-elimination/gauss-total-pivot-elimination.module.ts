import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GaussTotalPivotEliminationPage} from './gauss-total-pivot-elimination';

@NgModule({
  declarations: [
    GaussTotalPivotEliminationPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussTotalPivotEliminationPage),
    TranslateModule.forChild()
  ],
  exports: [
    GaussTotalPivotEliminationPage
  ]
})
export class GaussTotalPivotEliminationPageModule {}
