import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {LagrangePage} from './lagrange';

@NgModule({
  declarations: [
    LagrangePage,
  ],
  imports: [
    IonicPageModule.forChild(LagrangePage),
    TranslateModule.forChild()
  ],
  exports: [
    LagrangePage
  ]
})
export class LagrangePageModule {}
