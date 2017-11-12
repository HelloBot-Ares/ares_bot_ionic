import { Component, Input } from '@angular/core';

@Component({
  selector: 'grad-card',
  templateUrl: 'grad-card.html'
})
export class GradCardComponent {

  @Input()
  icon: string;

  @Input()
  text: string;

  @Input()
  textB: string;

  constructor() {

  }

}
