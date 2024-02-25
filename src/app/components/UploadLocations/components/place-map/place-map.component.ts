import { Component, OnInit } from '@angular/core';
import Place from '../../interfaces/place.interface';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-place-map',
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.css']
})
export class PlaceMapComponent{

  // latitude: number;
  // longitude: number;

  // places: Place[];

  // constructor(
  //   private placesService: PlacesService
  // ) {
  //   this.latitude = 40;
  //   this.longitude = -3;
  //   this.places = [];
  // }

  // ngOnInit(): void {
  //   this.placesService.getPlaces().subscribe(places => {
  //     this.places = places;
  //   })
  // }

}
