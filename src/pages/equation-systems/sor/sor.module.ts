import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {SorPage} from './sor';

@NgModule({
  declarations: [
    SorPage,
  ],
  imports: [
    IonicPageModule.forChild(SorPage),
    TranslateModule.forChild()
  ],
  exports: [
    SorPage
  ]
})
export class SorPageModule {}
