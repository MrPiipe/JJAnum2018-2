import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GaussSimpleEliminationPage} from './gauss-simple-elimination';

@NgModule({
  declarations: [
    GaussSimpleEliminationPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussSimpleEliminationPage),
    TranslateModule.forChild()
  ],
  exports: [
    GaussSimpleEliminationPage
  ]
})
export class GaussSimpleEliminationPageModule {}
