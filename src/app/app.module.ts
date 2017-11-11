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

// ares
import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { JournalPage } from '../pages/journal/journal';
import { UserProvider } from '../providers/user/user';
import { ItalyDataProvider } from '../providers/italy-data/italy-data';
import { EventCardComponent } from '../components/event-card/event-card';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AuthPage,
    HomePage,
    JournalPage,
    EventCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AuthPage,
    HomePage,
    JournalPage,
    EventCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OneSignal,
    ItalyDataProvider
  ]
})
export class AppModule {}
