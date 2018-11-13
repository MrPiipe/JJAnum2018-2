import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {EquationSystemsPage} from './equation-systems';

@NgModule({
  declarations: [
    EquationSystemsPage,
  ],
  imports: [
    IonicPageModule.forChild(EquationSystemsPage),
    TranslateModule.forChild()
  ],
  exports: [
    EquationSystemsPage
  ]
})
export class EquationSystemsPageModule {}
