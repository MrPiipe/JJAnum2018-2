import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {DoolittlePage} from './doolittle';

@NgModule({
  declarations: [
    DoolittlePage,
  ],
  imports: [
    IonicPageModule.forChild(DoolittlePage),
    TranslateModule.forChild()
  ],
  exports: [
    DoolittlePage
  ]
})
export class DoolittlePageModule {}
