import { Component } from '@angular/core';
import { PlacesService } from '../UploadLocations/services';
import Place from '../UploadLocations/interfaces/place.interface';

@Component({
  selector: 'app-place-list-user',
  templateUrl: './place-list-user.component.html',
  styleUrls: ['./place-list-user.component.css']
})
export class PlaceListUserComponent {

  places: Place[] | undefined;

  constructor(
    private placesService: PlacesService
  ) {
  }

  ngOnInit(): void {
    this.placesService.places$.subscribe(places => {
      this.places = places;
    });
  }
}
