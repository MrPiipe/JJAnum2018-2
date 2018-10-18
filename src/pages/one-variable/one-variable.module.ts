import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {OneVariablePage} from './one-variable';

@NgModule({
  declarations: [
    OneVariablePage,
  ],
  imports: [
    IonicPageModule.forChild(OneVariablePage),
    TranslateModule.forChild()
  ],
  exports: [
    OneVariablePage
  ]
})
export class OneVariablePageModule {}
