import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay placesServices.location');

    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/nahumlopz/cltkmkcn601oz01qu0d6bh18e',
      center: this.placesService.userLocation,
      zoom: 14,
      pitch: 30,
      maxBounds: [
        [-99.3269, 19.1056],
        [-98.5636, 19.7039]
      ]
    });

    const popupUserLocation = new Popup()
      .setHTML('<h6>Aqui Estoy</h6><br><span>Estoy en este lugar del mundo</span>');

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popupUserLocation)
      .addTo(map);

    this.mapService.setMap(map);
    this.loadMuseums(map);
  }

  loadMuseums(map: mapboxgl.Map): void {
    // Utiliza el servicio de Places para obtener las coordenadas de los museos
    this.placesService.getMuseumsLocations('Ciudad de México').then((museumLocations: number[][]) => {
      museumLocations.forEach(location => {
        // Ajustar la línea para pasar un array de dos elementos
        const popupMuse = new Popup().setHTML('<h6>Museo</h6><p>Descripción del museo...</p>');

        // Verificar si las coordenadas son del Museo de Historia Naval
        if (this.isNavalHistoryMuseum(location)) {
          popupMuse.setHTML('<h6>Museo de Historia Naval</h6><p>Descripción del Museo de Historia Naval...</p>');
        }

        // Crear marcador
        const marker = new Marker({ color: 'blue' })
          .setLngLat(location as [number, number]) // Ajuste aquí
          .setPopup(popupMuse)
          .addTo(map);

        // Evento de clic
        marker.getElement().addEventListener('click', () => {
          // Acciones al hacer clic en el marcador
          console.log('Marcador clickeado:', location);
        });

        // Evento de mouseenter
        marker.getElement().addEventListener('mouseenter', () => {
          // Cambiar el estilo o realizar acciones cuando el ratón entra en el marcador
          marker.togglePopup(); // Puedes mostrar el popup al entrar
          marker.getElement().style.cursor = 'pointer'; // Cambiar el cursor
        });

        // Evento de mouseleave
        marker.getElement().addEventListener('mouseleave', () => {
          // Cambiar el estilo o realizar acciones cuando el ratón sale del marcador
          marker.togglePopup(); // Puedes ocultar el popup al salir
          marker.getElement().style.cursor = ''; // Restaurar el cursor por defecto
        });
      });
    });
  }

  // Función para verificar si las coordenadas son del Museo de Historia Naval
  isNavalHistoryMuseum(coordinates: number[]): boolean {
    const navalHistoryMuseumCoordinates = [-99.1362, 19.3644]; // Coordenadas del Museo de Historia Naval
    return (
      coordinates[0] === navalHistoryMuseumCoordinates[0] &&
      coordinates[1] === navalHistoryMuseumCoordinates[1]
    );
  }
}
