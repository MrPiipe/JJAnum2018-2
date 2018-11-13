import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {SeidelPage} from './seidel';

@NgModule({
  declarations: [
    SeidelPage,
  ],
  imports: [
    IonicPageModule.forChild(SeidelPage),
    TranslateModule.forChild()
  ],
  exports: [
    SeidelPage
  ]
})
export class SeidelPageModule {}
