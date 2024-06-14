import { Component, OnInit, HostListener } from '@angular/core';
import { PlacesService } from '../UploadLocations/services';
import Place from '../UploadLocations/interfaces/place.interface';

@Component({
  selector: 'app-place-list-user',
  templateUrl: './place-list-user.component.html',
  styleUrls: ['./place-list-user.component.css']
})
export class PlaceListUserComponent implements OnInit {
  selectedPlace: any;
  isModalOpen: boolean = false; // Variable para controlar el estado de la modal
  categorizedPlaces: { category: string, places: Place[] }[] = [];
  loadingMore: boolean = false;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService.places$.subscribe(places => {
      if (!places) return;

      // Agrupar los lugares por categorías
      const categorizedPlacesMap = new Map<string, Place[]>();
      places.forEach(place => {
        if (place.categories) { // Verificar si place.categories existe
          place.categories.forEach(category => {
            if (!categorizedPlacesMap.has(category)) {
              categorizedPlacesMap.set(category, []);
            }
            categorizedPlacesMap.get(category)?.push(place);
          });
        }
      });
  
      // Convertir el mapa a un array para mostrarlo en el HTML
      this.categorizedPlaces = Array.from(categorizedPlacesMap.entries()).map(([category, places]) => {
        return { category, places };
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loadingMore) {
      this.loadingMore = true;
      this.loadMorePlaces();
    }
  }

  loadMorePlaces(): void {
    this.placesService.loadMorePlaces().then(() => {
      this.loadingMore = false;
    });
  }

  showModal(place: any): void {
    this.selectedPlace = place;
    this.isModalOpen = true; // Abrir la modal
    document.body.style.overflow = 'hidden'; 
  }

  closeModal(): void {
    this.selectedPlace = null;
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; 
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
