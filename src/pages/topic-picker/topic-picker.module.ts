import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPickerPage } from './topic-picker';

@NgModule({
  declarations: [
    TopicPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPickerPage),
  ],
})
export class TopicPickerPageModule {}
