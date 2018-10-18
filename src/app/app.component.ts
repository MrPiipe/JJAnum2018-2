import {Component, ViewChild} from '@angular/core';

import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, Nav, Platform} from 'ionic-angular';

import {FirstRunPage} from '../pages';
import {Settings} from '../providers';


@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Welcome', component: 'WelcomePage'},
    {title: 'Tabs', component: 'TabsPage'},
    {title: 'Cards', component: 'CardsPage'},
    {title: 'Content', component: 'ContentPage'},
    {title: 'One Variable', component: 'OneVariablePage'},
    {title: 'Menu', component: 'MenuPage'},
    {title: 'Settings', component: 'SettingsPage'},
    {title: 'Search', component: 'SearchPage'}
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
