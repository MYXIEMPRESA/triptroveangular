import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-results-bard',
  templateUrl: './generate-results-bard.component.html',
  styleUrls: ['./generate-results-bard.component.css']
})
export class GenerateResultsBardComponent {
  startLocation: string = '';
  endLocation: string = '';
  departureTime: string = '';
  routeInfo: any;
  isCollapsed: boolean = false;
  message: string = '';

  constructor(private http: HttpClient) { }

  submitForm() {
    const data = {
      startLocation: this.startLocation,
      endLocation: this.endLocation,
      departureTime: this.departureTime
    };

    this.http.post<any>('http://localhost:5000/', data).subscribe(
      (response) => {
        this.routeInfo = response;
        this.message = '¡La solicitud se procesó correctamente!';
        console.log('Response from Flask server:', response);
      },
      (error) => {
        this.message = 'Ocurrió un error al procesar la solicitud';
        console.error('Error occurred:', error);
      }
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}