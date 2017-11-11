// lib
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

// ares
import { AuthPage } from '../../pages/auth/auth';

const ONESIGNAL_TOKEN = '221ce78e-5361-46e8-ab4e-203bba2db0ea';

@Injectable()
export class UserProvider {

  apiBase : string = 'http://10.0.4.255:3000/api/';
  // apiBase : string = '/franci/';

  currentUser: any = null;

  constructor(
    public http: Http,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    @Inject(Storage) private storage: Storage,
    public events: Events,
    public oneSignal: OneSignal
  ) {
    this.checkUserAuthentication();
  }

  checkUserAuthentication() {
    this.storage.get('userAuthData').then(data => {
      if (data != null) {
        this.events.publish('auth:validation:success');
        this.currentUser = data;
        console.log(data);
        this.initOneSignal();
      } else {
        this.events.publish('auth:validation:error');
      }
    });
  }

  login(userData) {
    let URL = this.apiBase + 'signin';
    let BODY = {
      user: userData
    }

    this.http.post(URL, BODY).subscribe(resp => {
      if (JSON.parse(resp['_body'])) {
        this.storage.set('userAuthData', JSON.parse(resp['_body']));
        this.currentUser = JSON.parse(resp['_body']);
        this.events.publish('auth:validation:success');
        this.initOneSignal();
      }
    });
  }

  register(newUserData) {
    let URL = this.apiBase + 'signup';
    let BODY = {
      user: newUserData
    }

    this.http.post(URL, BODY).subscribe( resp => {
      if ( JSON.parse(resp['_body']) ) {
        let userData = JSON.parse(resp['_body']).user;
        this.storage.set('userAuthData', userData );
        this.currentUser = userData;
        this.events.publish('auth:validation:success');
        this.initOneSignal();
      }
    });
  }


  // private

  private initOneSignal() {
    if (window['cordova']) {
      this.oneSignal.startInit(ONESIGNAL_TOKEN, '1009092796');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.registerForPushNotifications();

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();
    } else {
      this.toastCtrl.create({message: 'MISSING_PLUGIN: ONE_SIGNAL', duration: 1000}).present();
    }
  }
}
