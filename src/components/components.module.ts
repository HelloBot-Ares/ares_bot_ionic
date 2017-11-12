import { NgModule } from '@angular/core';
import { EventCardComponent } from './event-card/event-card';
import { GradCardComponent } from './grad-card/grad-card';
@NgModule({
	declarations: [EventCardComponent,
    GradCardComponent],
	imports: [],
	exports: [EventCardComponent,
    GradCardComponent]
})
export class ComponentsModule {}
