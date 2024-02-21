import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation? = [0, 0];

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const userLocation = [coords.longitude, coords.latitude];
          resolve(userLocation);
        },
        (err) => {
          alert("No se pudo obtener la geolocalización");
          console.log(err);
          reject(err);
        }
      );
    });
  }

}
