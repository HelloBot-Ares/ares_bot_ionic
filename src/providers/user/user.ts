// lib
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

import { Storage } from '@ionic/storage';

// ares
import { AuthPage } from '../../pages/auth/auth';

@Injectable()
export class UserProvider {

  // apiBase : string = 'http://10.0.4.255:3000/api/';
  apiBase : string = '/franci/';

  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    @Inject(Storage) private storage: Storage,
    public events: Events
  ) {
    this.checkUserAuthentication();
  }

  checkUserAuthentication() {
    this.storage.get('userAuthData').then(data => {
      if (data != null) {
        this.events.publish('auth:validation:success');
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
        this.events.publish('auth:validation:success');
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
        this.storage.set('userAuthData', JSON.parse(resp['_body']) );
        this.events.publish('auth:validation:success');
      }
    });
  }

}
