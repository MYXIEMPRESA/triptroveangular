import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlacesService } from '../maps/services/places.service'; // Importa el servicio correctamente
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  searchTerm: string = '';
  places: any[] = [];
  private placesSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private placeService: PlacesService // Inyecta el servicio correctamente
  ) {}

  ngOnInit() {
    this.getAllPlaces();
  }

  ngOnDestroy(): void {
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe(); // Desuscribe la suscripción para evitar memory leaks
    }
    window.removeEventListener('scroll', this.handleScroll); // Elimina el listener del evento 'scroll'
  }

  getAllPlaces() {
    this.placeService.getPlacesByQuery(); // Obtén todas las ubicaciones
    this.placesSubscription = this.placeService.placesChanged.subscribe((places: any[]) => {
      this.places = places;
    });
  }

  search() {
    this.placeService.getPlacesByQuery(this.searchTerm); // Busca ubicaciones según el término de búsqueda
  }

  logOut() {
    this.authService.logOut();
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
      header?.classList.add('sticky');
    } else {
      header?.classList.remove('sticky');
    }
  }
}
