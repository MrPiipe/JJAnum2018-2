import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {InterpolationPage} from './interpolation';

@NgModule({
  declarations: [
    InterpolationPage,
  ],
  imports: [
    IonicPageModule.forChild(InterpolationPage),
    TranslateModule.forChild()
  ],
  exports: [
    InterpolationPage
  ]
})
export class InterpolationPageModule {}
