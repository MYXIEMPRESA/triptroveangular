import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { GenerateResultsBardComponent } from './components/generate-results-bard/generate-results-bard.component';

@NgModule({
  declarations: [
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    SearchBarComponent,
    SearchResultsComponent,
    GenerateResultsBardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class MapsModule { }
