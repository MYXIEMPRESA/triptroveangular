import { Component, OnInit } from '@angular/core';

import { PlacesService } from '../../services';
import Place from '../../interfaces/place.interface';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[] | undefined;

  constructor(
    private placesService: PlacesService) {
  }

  ngOnInit(): void {
    this.placesService.places$.subscribe(places => {
      this.places = places;
    });
  }

  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace(place);
    console.log(response);
  }
}
