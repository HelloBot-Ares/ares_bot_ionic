import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { JournalPage } from '../journal/journal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeTabRoot = HomePage;
  journalTabRoot = JournalPage;

  constructor() {

  }
}
