import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectionMapPage } from './direction-map';

@NgModule({
  declarations: [
    DirectionMapPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectionMapPage),
  ],
})
export class DirectionMapPageModule {}
