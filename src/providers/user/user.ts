// lib
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

// ares
import { AuthPage } from '../../pages/auth/auth';

@Injectable()
export class UserProvider {

  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    @Inject(Storage) private storage: Storage
  ) {
    this.checkUserAuthentication();
  }

  checkUserAuthentication() {
    this.storage.get('userAuthData').then(data => {
      if (data != null) {
        // sei loggato
      } else {
        let authModal = this.modalCtrl.create(AuthPage);
        authModal.present();
      }
    });
  }

}
