import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {NewtonPage} from './newton';

@NgModule({
  declarations: [
    NewtonPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtonPage),
    TranslateModule.forChild()
  ],
  exports: [
    NewtonPage
  ]
})
export class NewtonPageModule {}
