import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TopicPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topic-picker',
  templateUrl: 'topic-picker.html',
})
export class TopicPickerPage {

  searchTerm : string = '';
  selectedTopic : any = undefined;
  originalTopics : any[] = [];
  topics : any[] = [];

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.originalTopics = this.navParams.get('topics');
    this.topics = this.originalTopics;
    this.topics.forEach(topic=> {
      topic.selected = false;
    });
  }

  ionViewDidLoad() {
  }

  filterTopics(event) {
    this.topics = this.originalTopics.filter((topic) => {
      return topic.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  onSelectTopic() {
    this.viewCtrl.dismiss(this.selectedTopic)
  }
}
