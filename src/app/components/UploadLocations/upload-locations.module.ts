import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewPlaceComponent } from './components/new-place/new-place.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceMapComponent } from './components/place-map/place-map.component';
import { ScreenUploadLocationComponent } from './screen/screen-upload-location/screen-upload-location.component';


@NgModule({
  declarations: [
    PlaceListComponent,
    PlaceMapComponent,
    NewPlaceComponent,
    ScreenUploadLocationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],exports:[
    ScreenUploadLocationComponent,
  ]
})
export class UploadLocationsModule { }
