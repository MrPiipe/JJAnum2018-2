import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {BisectionPage} from './bisection';

@NgModule({
  declarations: [
    BisectionPage,
  ],
  imports: [
    IonicPageModule.forChild(BisectionPage),
    TranslateModule.forChild()
  ],
  exports: [
    BisectionPage
  ]
})
export class BisectionPageModule {}
