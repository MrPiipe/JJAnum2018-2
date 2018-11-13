import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {SecantPage} from './secant';

@NgModule({
  declarations: [
    SecantPage,
  ],
  imports: [
    IonicPageModule.forChild(SecantPage),
    TranslateModule.forChild()
  ],
  exports: [
    SecantPage
  ]
})
export class SecantPageModule {}
