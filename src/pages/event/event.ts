import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  event: any;
  contentClass: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {
    this.event = this.navParams.get('event');
    this.contentClass = this.navParams.get('contentClass');
  }

  ionViewDidLoad() {
  }

}
