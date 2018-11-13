import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {GrapherPage} from './grapher';

@NgModule({
  declarations: [
    GrapherPage,
  ],
  imports: [
    IonicPageModule.forChild(GrapherPage),
    TranslateModule.forChild()
  ],
  exports: [
    GrapherPage
  ]
})
export class GrapherPageModule {}
