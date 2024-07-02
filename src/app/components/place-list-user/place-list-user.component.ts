import { Component, OnInit, HostListener } from '@angular/core';
import { PlacesService } from '../UploadLocations/services';
import { Place } from '../UploadLocations/interfaces/place.interface';

@Component({
  selector: 'app-place-list-user',
  templateUrl: './place-list-user.component.html',
  styleUrls: ['./place-list-user.component.css']
})
export class PlaceListUserComponent implements OnInit {
  selectedPlace: Place | null = null;
  isModalOpen: boolean = false;
  categorizedPlaces: { category: string, places: Place[] }[] = [];

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService.places$.subscribe(places => {
      console.log('Fetching places from service:', places);
      const categorizedPlacesMap = new Map<string, Place[]>();
      places.forEach(place => {
        place.categories.forEach(category => {
          if (!categorizedPlacesMap.has(category)) {
            categorizedPlacesMap.set(category, []);
          }
          categorizedPlacesMap.get(category)?.push(place);
        });
      });
      this.categorizedPlaces = Array.from(categorizedPlacesMap.entries())
                                   .map(([category, places]) => ({ category, places }));
      console.log('Categorized places:', this.categorizedPlaces);
    }, error => console.error('Error fetching places:', error));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    console.log('Window scrolled:', event);
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('End of page reached, loading more places.');
      this.placesService.loadMorePlaces();
    }
  }

  showModal(place: Place): void {
    console.log('Showing modal for:', place);
    this.selectedPlace = place;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    console.log('Closing modal');
    this.selectedPlace = null;
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  stopPropagation(event: Event): void {
    console.log('Stopping propagation for event:', event);
    event.stopPropagation();
  }
}
