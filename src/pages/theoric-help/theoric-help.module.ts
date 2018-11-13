import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {TheoricHelpPage} from './theoric-help';

@NgModule({
  declarations: [
    TheoricHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(TheoricHelpPage),
    TranslateModule.forChild()
  ],
  exports: [
    TheoricHelpPage
  ]
})
export class TheoricHelpPageModule {}
