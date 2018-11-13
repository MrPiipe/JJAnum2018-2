import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {VandermondePage} from './vandermonde';

@NgModule({
  declarations: [
    VandermondePage,
  ],
  imports: [
    IonicPageModule.forChild(VandermondePage),
    TranslateModule.forChild()
  ],
  exports: [
    VandermondePage
  ]
})
export class VandermondePageModule {}
