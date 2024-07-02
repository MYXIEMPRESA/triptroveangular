import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import {Place} from '../../interfaces/place.interface';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[] = [];

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService.places$.subscribe(places => {
      this.places = places;
    });
  }

  async onClickDelete(place: Place) {
    try {
      await this.placesService.deletePlace(place);
      this.places = this.places.filter(p => p.id !== place.id);
    } catch (error) {
      console.error('Error deleting place: ', error);
    }
  }
}
