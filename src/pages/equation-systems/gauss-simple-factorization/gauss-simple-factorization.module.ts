import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GaussSimpleFactorizationPage} from './gauss-simple-factorization';

@NgModule({
  declarations: [
    GaussSimpleFactorizationPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussSimpleFactorizationPage),
    TranslateModule.forChild()
  ],
  exports: [
    GaussSimpleFactorizationPage
  ]
})
export class GaussSimpleFactorizationPageModule {}
