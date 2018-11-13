import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {CroutPage} from './crout';

@NgModule({
  declarations: [
    CroutPage,
  ],
  imports: [
    IonicPageModule.forChild(CroutPage),
    TranslateModule.forChild()
  ],
  exports: [
    CroutPage
  ]
})
export class CroutPageModule {}
