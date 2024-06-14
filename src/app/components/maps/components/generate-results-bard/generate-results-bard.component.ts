import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapService } from '../../services/map.service'; // Asegúrate de tener la ruta correcta

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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  submitForm() {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.routeInfoArray = [];

      this.temas.forEach(tema => {
        const url = `http://localhost:5000/museos_cercanos?lat=${latitude}&lon=${longitude}&tema=${tema}`;
        this.http.get<any[]>(url).subscribe(
          response => {
            this.routeInfoArray = this.routeInfoArray.concat(response);
            this.message = '¡La solicitud se procesó correctamente!';
            console.log('Response from Flask server:', response);

            // Utiliza MapService para crear marcadores
            if (this.mapService.isMapReady) {
              response.forEach(museo => {
                this.mapService.flyTo([museo.longitud, museo.latitud]);
                this.mapService.createMarkersFromPlaces([{
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
                  }, // Ajustar según la interfaz real de 'Properties'
                  text_es: '',
                  language_es: '',
                  place_name_es: '',
                  language: '',
                  bbox: [],
                  geometry: {
                    type: "Point",
                    coordinates: [museo.longitud, museo.latitud]
                  },
                  context: []
                }], [longitude, latitude]);
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
