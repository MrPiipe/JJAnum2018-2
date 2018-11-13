import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {MultipleRootsPage} from './multiple-roots';

@NgModule({
  declarations: [
    MultipleRootsPage,
  ],
  imports: [
    IonicPageModule.forChild(MultipleRootsPage),
    TranslateModule.forChild()
  ],
  exports: [
    MultipleRootsPage
  ]
})
export class MultipleRootsPageModule {}
