import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {



  getDirections(place : Feature) {

    if(!this.placesServices.userLocation) throw Error('No hay userLocation');

    this.placesServices.upPlaces();

    const start = this.placesServices.userLocation;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start,end)
  }

  public selectedId: String = '';

  constructor( private placesServices: PlacesService,
    private mapService: MapService
    ){}

  get isLodingPlaces(){
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesServices.places;
  }

  flyto(places: Feature){
    this.selectedId = places.id;
    const[ lng, lat] =places.center;
    this.mapService.flyTo({lng,lat})
  }
}

