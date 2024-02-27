import { Component } from '@angular/core';
import { PlacesService } from '../UploadLocations/services';
import Place from '../UploadLocations/interfaces/place.interface';

@Component({
  selector: 'app-place-list-user',
  templateUrl: './place-list-user.component.html',
  styleUrls: ['./place-list-user.component.css']
})
export class PlaceListUserComponent {
  
  selectedPlace: any;

  showModal(place: any): void {
    this.selectedPlace = place;
    document.body.style.overflow = 'hidden'; // opcional: evita el scroll en el fondo
  }

  closeModal(): void {
    this.selectedPlace = null;
    document.body.style.overflow = 'auto'; // opcional: restaura el scroll en el fondo
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
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
