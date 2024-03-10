import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = []

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor(private placesApi: PlacesApiClient,
    private mapService: MapService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert("No se pudo obtener la geolocalización");
          console.log(err);
          reject(err);
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = []
      return;
    }
    if (!this.userLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, { params: { proximity: this.userLocation?.join(',') } })
      .subscribe(resp => {
        console.log(resp.features[0]);
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places,this.userLocation!);
      });
  }
  upPlaces(){
    this.places = [];
  }

  public async getMuseumsLocations(city: string): Promise<[number, number][]> {
    if (!this.userLocation) throw Error('No hay userLocation');
  
    const endpoint = `/${city}/museum.json`; // Ajusta la ruta según tu API
  
    return this.placesApi.get<PlacesResponse>(endpoint, { params: { proximity: this.userLocation?.join(','), limit: 20 } })
      .toPromise()
      .then(resp => {
        if (!resp || !resp.features) {
          console.error('Respuesta inesperada del servidor:', resp);
          return [];
        }
  
        // Filtrar y validar que cada elemento sea un array de dos elementos
        const filteredLocations = resp.features
          .map((feature: Feature) => feature.geometry.coordinates)
          .filter(location => Array.isArray(location) && location.length === 2);
  
        return filteredLocations as [number, number][];
      })
      .catch(error => {
        console.error('Error al obtener ubicaciones de museos:', error);
        return [];
      });
  }
}
