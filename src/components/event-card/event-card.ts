import { Component } from '@angular/core';

/**
 * Generated class for the EventCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  text: string;

  constructor() {
    console.log('Hello EventCardComponent Component');
    this.text = 'Hello World';
  }

}
