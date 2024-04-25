import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-results-bard',
  templateUrl: './generate-results-bard.component.html',
  styleUrls: ['./generate-results-bard.component.css']
})
export class GenerateResultsBardComponent {
toggleSidebar() {
throw new Error('Method not implemented.');
}
  temas: string[] = [];
  routeInfoArray: any[] = [];
  isCollapsed: boolean = false;
  message: string = '';

  constructor(private http: HttpClient) { }

  toggleTema(tema: string): void {
    const index = this.temas.indexOf(tema);
    if (index > -1) {
      this.temas.splice(index, 1); // Remove if already selected
    } else {
      this.temas.push(tema); // Add if not selected
    }
  }

  submitForm() {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.temas.forEach(tema => {
        const url = `http://localhost:5000/museos_cercanos?lat=${latitude}&lon=${longitude}&tema=${tema}`;
        this.http.get<any>(url).subscribe(
          response => {
            this.routeInfoArray.push(response);
            this.message = '¡La solicitud se procesó correctamente!';
            console.log('Response from Flask server:', response);
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
