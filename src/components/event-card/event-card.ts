// lib
import { Component, Input } from '@angular/core';

// ares

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  @Input()
  event: any;

  @Input()
  icon: string;

  @Input()
  text: string;

  constructor() {
  }

}
