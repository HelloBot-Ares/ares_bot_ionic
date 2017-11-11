// lib
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { trigger, state, transition, style, animate } from '@angular/animations';

// ares
import { UserProvider } from '../../providers/user/user';
import { ItalyDataProvider } from '../../providers/italy-data/italy-data';

const visibilityStateOn = {
  opacity: 1,
  transform: 'translate3D(0,0,0)',
  visibility: 'visible'
}

const visibilityStateOff = {
  opacity: 0,
  transform: 'translate3D(0,-3.3%,0)',
  visibility: 'hidden'
}

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
    animations: [
      trigger('visibilityStatus', [
        state('on', style(visibilityStateOn)),
        state('off', style(visibilityStateOff)),
        transition('* <=> *', animate('250ms'))
      ])
    ]
})
export class AuthPage {

  activeAuthSection: string = '';
  loginData: any = {
    username: '',
    password: ''
  }
  registerData: any = {
    username: '',
    password: '',
    city: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userProvider: UserProvider,
    private italyData: ItalyDataProvider
  ) {
    // nothing to do
  }

  ionViewDidLoad() {
    setTimeout(()=> {
      this.activeAuthSection = 'welcome';
    }, 500);
  }

  onSetActiveSection(newSection) {
    this.activeAuthSection = newSection;
  }

  onSelectUserMunicipality() {
    let municipalityAlert = this.alertCtrl.create({
      cssClass: 'municipality-picker'
    });

    municipalityAlert.setTitle('Seleziona la tua Città');
    this.italyData.provinces.forEach(prov => {
      municipalityAlert.addInput({ type: 'radio', label: prov.nome, value: prov.nome, checked: false });
    });
    municipalityAlert.addButton({
      text: 'Conferma',
      handler: data => {
        this.registerData.city = data;
      }
    });
    municipalityAlert.present();

  }
}
