import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {IncrementalSearchesPage} from './incremental-searches';

@NgModule({
  declarations: [
    IncrementalSearchesPage,
  ],
  imports: [
    IonicPageModule.forChild(IncrementalSearchesPage),
    TranslateModule.forChild()
  ],
  exports: [
    IncrementalSearchesPage
  ]
})
export class IncrementalSearchesPageModule {}
