import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {JacobiPage} from './jacobi';

@NgModule({
  declarations: [
    JacobiPage,
  ],
  imports: [
    IonicPageModule.forChild(JacobiPage),
    TranslateModule.forChild()
  ],
  exports: [
    JacobiPage
  ]
})
export class JacobiPageModule {}
