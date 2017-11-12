import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    console.log(this.searchResults);
  }

  ionViewDidLoad() {
  }

}
