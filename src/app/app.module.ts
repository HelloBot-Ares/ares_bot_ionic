// lib
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';

import { CalendarModule } from "ion2-calendar";
import { MomentModule } from 'angular2-moment';
import "moment/locale/it"

// ares
import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { JournalPage } from '../pages/journal/journal';
import { UserProvider } from '../providers/user/user';
import { ItalyDataProvider } from '../providers/italy-data/italy-data';
import { EventCardComponent } from '../components/event-card/event-card';
import { SearchEventPage } from '../pages/search-event/search-event';
import { TopicPickerPage } from '../pages/topic-picker/topic-picker';
import { GradCardComponent } from '../components/grad-card/grad-card';
import { TopicProvider } from '../providers/topic/topic';
import { EventProvider } from '../providers/event/event';
import { SearchResultsPage } from '../pages/search-results/search-results';
import { NewEventPage } from '../pages/new-event/new-event';
import { EventPage } from '../pages/event/event';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AuthPage,
    HomePage,
    JournalPage,
    SearchEventPage,
    NewEventPage,
    EventPage,
    SearchResultsPage,
    TopicPickerPage,
    EventCardComponent,
    GradCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),
    MomentModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AuthPage,
    HomePage,
    JournalPage,
    SearchEventPage,
    NewEventPage,
    EventPage,
    SearchResultsPage,
    TopicPickerPage,
    EventCardComponent,
    GradCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OneSignal,
    ItalyDataProvider,
    TopicProvider,
    Geolocation,
    EventProvider
  ]
})
export class AppModule {}
