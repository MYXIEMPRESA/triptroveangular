import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapService } from '../../services/map.service'; // Asegúrate de tener la ruta correcta
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-generate-results-bard',
  templateUrl: './generate-results-bard.component.html',
  styleUrls: ['./generate-results-bard.component.css']
})
export class GenerateResultsBardComponent {
  temas: string[] = [];
  routeInfoArray: any[] = [];
  isCollapsed: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private mapService: MapService) { }

  toggleTema(tema: string): void {
    const index = this.temas.indexOf(tema);
    if (index > -1) {
      this.temas.splice(index, 1);
    } else {
      this.temas.push(tema);
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  submitForm(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const userLocation: [number, number] = [longitude, latitude]; // Ubicación del usuario
      this.routeInfoArray = [];

      this.temas.forEach(tema => {
        const url = `http://localhost:5000/museos_cercanos?lat=${latitude}&lon=${longitude}&tipo=${tema}`;
        this.http.get<any[]>(url).subscribe(
          response => {
            this.routeInfoArray = [...this.routeInfoArray, ...response];
            this.message = '¡La solicitud se procesó correctamente!';
            console.log('Response from Flask server:', response);

            if (this.mapService.isMapReady && response.length >= 3) {
              // Asumiendo que se devuelven al menos 3 museos
              const museo1 = response[0];
              const museo2 = response[1];
              const museo3 = response[2];

              // Crear marcadores y popups para los museos
              const places: Feature[] = [museo1, museo2, museo3].map(museo => ({
                text: museo.nombre,
                place_name: museo.nombre,
                center: [museo.longitud, museo.latitud],
                id: '',
                type: '',
                place_type: [],
                relevance: 0,
                properties: {
                  mapbox_id: '',
                  wikidata: '',
                  short_code: ''
                },
                geometry: {
                  type: "Point",
                  coordinates: [museo.longitud, museo.latitud]
                },
                context: [],
                text_es: '',
                language_es: '',
                place_name_es: '',
                language: '',
                bbox: []
              }));

              this.mapService.createMarkersFromPlaces(places, userLocation);
              this.mapService.getRouteBetweenPoints('walking', userLocation, [museo1.longitud, museo1.latitud])
              .subscribe(route1 => {
                this.mapService.drawPolyline(route1, this.mapService.mapSubject.value!, 'route1', '#FF5733'); 
            
                this.mapService.getRouteBetweenPoints('walking', [museo1.longitud, museo1.latitud], [museo2.longitud, museo2.latitud])
                  .subscribe(route2 => {
                    this.mapService.drawPolyline(route2, this.mapService.mapSubject.value!, 'route2', '#33CFFF'); 
            
                    this.mapService.getRouteBetweenPoints('walking', [museo2.longitud, museo2.latitud], [museo3.longitud, museo3.latitud])
                      .subscribe(route3 => {
                        this.mapService.drawPolyline(route3, this.mapService.mapSubject.value!, 'route3', '#8E44AD');
            
                        this.mapService.getRouteBetweenPoints('walking', [museo3.longitud, museo3.latitud], userLocation)
                          .subscribe(route4 => {
                            this.mapService.drawPolyline(route4, this.mapService.mapSubject.value!, 'route4', '#27AE60');
                          });
                      });
                  });
              });
            
            }
          },
          error => {
            this.message = 'Ocurrió un error al procesar la solicitud';
            console.error('Error occurred:', error);
          }
        );
      });
    }, error => {
      console.error('Error occurred while getting current position:', error);
      this.message = 'No se pudo obtener la ubicación actual del usuario';
    });
  }
}
