import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {FalsePositionPage} from './false-position';

@NgModule({
  declarations: [
    FalsePositionPage,
  ],
  imports: [
    IonicPageModule.forChild(FalsePositionPage),
    TranslateModule.forChild()
  ],
  exports: [
    FalsePositionPage
  ]
})
export class FalsePositionPageModule {}
