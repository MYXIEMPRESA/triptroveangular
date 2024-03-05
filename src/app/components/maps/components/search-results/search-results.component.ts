import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  
  //constructor
  constructor( private placesServices: PlacesService,
    private mapService: MapService
    ){}
  
    //variables
    public transport: String = 'walking';
    public selectedId: String = '';

    //get and set
    get isLodingPlaces(){
      return this.placesServices.isLoadingPlaces;
    }
    
    get places(): Feature[]{
      return this.placesServices.places;
    }

    //metodos
    //direcciones
  getDirections(transport : String,place : Feature) {
    if(!this.placesServices.userLocation) throw Error('No hay userLocation');
    this.placesServices.upPlaces();
    const start = this.placesServices.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints(transport,start,end)
  }

  //animaciones
  flyto(places: Feature){
    this.selectedId = places.id;
    const[ lng, lat] =places.center;
    this.mapService.flyTo({lng,lat})
  }

  //subir transporte
  updateTransport(option: string): void {
    this.transport = option;
}
}

