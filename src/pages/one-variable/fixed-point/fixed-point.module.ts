import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {FixedPointPage} from './fixed-point';

@NgModule({
  declarations: [
    FixedPointPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedPointPage),
    TranslateModule.forChild()
  ],
  exports: [
    FixedPointPage
  ]
})
export class FixedPointPageModule {}
