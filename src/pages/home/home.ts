// lib
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// ares
import { UserProvider } from '../../providers/user/user';
import { SearchEventPage } from '../search-event/search-event';
import { NewEventPage } from '../new-event/new-event';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  userEvents : any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public eventProvider: EventProvider,
    public events: Events
  ) {

  }

  ionViewDidLoad() {
    setInterval(()=> {
      this.parseUserEvents();
    }, 1000);
    this.parseUserEvents();
  }

  parseUserEvents() {
    if (this.userProvider.currentUser) {
      this.eventProvider.userEvents().then((data: any) => {
        this.userEvents = data;
      });
    }
  }

  onSearchPage() {
    this.navCtrl.push(SearchEventPage);
  }

  onCreateGroup() {
    this.navCtrl.push(NewEventPage);
  }

}
