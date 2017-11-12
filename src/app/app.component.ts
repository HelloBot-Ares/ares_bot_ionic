// lib
import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular/util/events';

import { Storage } from '@ionic/storage';

// ares
import { TabsPage } from '../pages/tabs/tabs';
import { UserProvider } from '../providers/user/user';
import { AuthPage } from '../pages/auth/auth';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userProvider: UserProvider,
    events: Events,
    modalCtrl: ModalController,
    storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // DEBUG
      // storage.clear();
      // window.localStorage.clear();

      // Check Authentication
      let authModal = modalCtrl.create(AuthPage);
      events.subscribe('auth:validation:error', data => {
        authModal.present();
      });
      events.subscribe('auth:validation:success', data => {
        authModal.dismiss();
      });
    });
  }
}
