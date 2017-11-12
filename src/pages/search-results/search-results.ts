import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventPage } from '../event/event';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  searchResults : any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.searchResults = this.navParams.get('results');
  }

  ionViewDidLoad() {
  }

  onViewEvent(event, contentClass) {
    this.navCtrl.push(EventPage, {
      event: event,
      contentClass: contentClass
    });
  }

}
