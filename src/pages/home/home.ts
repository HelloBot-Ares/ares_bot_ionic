// lib
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// ares
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {

  }

  ionViewDidLoad() {
  }

}
