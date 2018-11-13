import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {NewtonInterpolationPage} from './newton-interpolation';

@NgModule({
  declarations: [
    NewtonInterpolationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtonInterpolationPage),
    TranslateModule.forChild()
  ],
  exports: [
    NewtonInterpolationPage
  ]
})
export class NewtonInterpolationPageModule {}
