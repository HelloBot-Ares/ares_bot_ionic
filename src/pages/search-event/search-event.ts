// lib
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { Http } from '@angular/http';
import "moment/locale/it"

import { Geolocation } from '@ionic-native/geolocation';

// ares
import { TopicProvider } from '../../providers/topic/topic';
import { TopicPickerPage } from '../topic-picker/topic-picker';
import { ItalyDataProvider } from '../../providers/italy-data/italy-data';
import { EventProvider } from '../../providers/event/event';
import { SearchResultsPage } from '../search-results/search-results';

declare var google : any;

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  @ViewChild('searchSlides')
  searchSlides: Slides;

  searchData: any = {};

  geocoder: any = new google.maps.Geocoder;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public topicProvider: TopicProvider,
    public italyDataProvider: ItalyDataProvider,
    public geolocation: Geolocation,
    public http: Http,
    public eventProvider: EventProvider
  ) {
    this.searchData.from_date = new Date();
    this.searchData.to_date = new Date('2018-01-31');
  }

  ionViewDidLoad() {
    this.searchSlides.lockSwipeToNext(true);
  }

  onSetMaxPartecipants(maxPartecipants) {
    this.searchData.max_partecipants = maxPartecipants;
    this.onNextSlide();
  }

  onSelectArgument() {
    let argPickerModal = this.modalCtrl.create(TopicPickerPage, {
      topics: this.topicProvider.topics
    });

    argPickerModal.onWillDismiss( selectedTopic => {
      console.log(selectedTopic)
      this.searchData.topic = selectedTopic;
      this.searchData.topic_id = selectedTopic.id;
    });

    argPickerModal.present();
  }

  onSetDate(whichDate) {

    let pickerTitle = '';
    let defaultDate = undefined;
    let defaultDateRange = undefined;

    if (whichDate == 'from_date') {
      pickerTitle = 'A partire dal...';
      defaultDate = this.searchData.from_date;
    } else {
      pickerTitle = 'Fino al...';
      defaultDate = this.searchData.to_date;
    }

    const options: CalendarModalOptions = {
      title: pickerTitle,
      color: 'primary',
      cssClass: 'custom-date-modal',
      closeIcon: true,
      doneIcon: true,
      weekdays: ['D', 'L', 'M', 'W', 'G', 'V', 'S'],
      weekStart: 1,
      defaultDate: defaultDate,
      defaultDateRange: defaultDateRange
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      if (date) {
        this.searchData[whichDate] = date.dateObj;
      }
    });
  }

  onSelectCity() {
    let municipalityAlert = this.alertCtrl.create({
      cssClass: 'municipality-picker'
    });

    municipalityAlert.setTitle('Seleziona la tua Città');
    this.italyDataProvider.provinces.forEach(prov => {
      municipalityAlert.addInput({ type: 'radio', label: prov.nome, value: prov.nome, checked: false });
    });
    municipalityAlert.addButton({
      text: 'Conferma',
      handler: data => {
        this.searchData.location = data;
      }
    });
    municipalityAlert.present();

  }

  onLocateMe() {
    let self = this;
    let loading = this.loadingCtrl.create({});
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      if (resp.coords) {
        let location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        this.geocoder.geocode({ location: location }, function (results, status) {
          console.warn(results)
          self.searchData.location = self.findCityFromGeocoder(results);
          loading.dismiss();

        });
        // resp.coords.latitude
        // resp.coords.longitude
        console.warn(resp);
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onStartSearch() {
    this.eventProvider.searchEvents(this.searchData).then(searchResults => {
      this.navCtrl.push(SearchResultsPage, {
        results: searchResults
      });
    });
  }

  private findCityFromGeocoder(results) {
    let localities = results.filter(res => {
      return res.types.indexOf('locality') != -1;
    });
    return localities[0].address_components[0].long_name;
  }

  onNextSlide() {
    this.searchSlides.lockSwipeToNext(false)
    this.searchSlides.slideNext();
    this.searchSlides.lockSwipeToNext(true);
  }

}
