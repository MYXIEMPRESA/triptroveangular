import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker } from 'mapbox-gl';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { DistanceApiClient } from '../api/distanceApiClient';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public mapSubject = new BehaviorSubject<Map | null>(null); // Cambiado a público
  private markers: Marker[] = [];
  private htmlPopups: HTMLElement[] = [];

  constructor(private directionsApi: DirectionsApiClient, private distanceApi: DistanceApiClient) {}

  setMap(map: Map): void {
    this.mapSubject.next(map);
    map.on('move', () => this.adjustHtmlPopups());
    map.on('resize', () => this.adjustHtmlPopups());
  }

  private adjustHtmlPopups(): void {
    if (!this.mapSubject.value) {
      console.error('Mapa no inicializado');
      return;
    }
    const map = this.mapSubject.value;

    this.markers.forEach((marker, index) => {
      const popup = this.htmlPopups[index];
      const lngLat = marker.getLngLat();
      const point = map.project(lngLat);

      popup.style.transform = `translate(-50%, -100%)`; // Centra el popup sobre el marcador
      popup.style.left = `${point.x}px`;
      popup.style.top = `${point.y}px`;
    });
  }

  get map$(): Observable<Map> {
    return this.mapSubject.asObservable().pipe(
      filter((map): map is Map => map !== null)
    );
  }

  get isMapReady(): boolean {
    return !!this.mapSubject.value;
  }

  flyTo(coords: LngLatLike): void {
    this.map$.subscribe(map => {
      map.flyTo({
        center: coords,
        zoom: 16,
        pitch: 40,
        essential: true
      });
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]): void {
    this.map$.subscribe(map => {
      this.clearMarkers();
      this.markers = places.map(place => {
        const [lng, lat] = place.center;
        const marker = new Marker().setLngLat([lng, lat]).addTo(map);
        const popupHtml = this.createHtmlPopup(place.text, place.place_name);
        map.getContainer().appendChild(popupHtml);
        this.htmlPopups.push(popupHtml);
        return marker;
      });

      const bounds = new LngLatBounds();
      this.markers.forEach(marker => bounds.extend(marker.getLngLat()));
      bounds.extend(userLocation);
      map.fitBounds(bounds, { padding: 200 });
    });
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.htmlPopups.forEach(popup => popup.remove());
    this.htmlPopups = [];
  }

  private createHtmlPopup(text: string, placeName: string): HTMLElement {
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.innerHTML = `<h6>${text}</h6><br><span>${placeName}</span>`;
    return popup;
  }

  getRouteBetweenPoints(transport: string, start: [number, number], end: [number, number]): Observable<Route> {
    return this.directionsApi.get<DirectionsResponse>(`/${transport}/${start.join(',')};${end.join(',')}`)
      .pipe(
        map(response => response.routes[0])
      );
  }

  public drawPolyline(route: Route, map: Map, id: string): void { // Añadir id como parámetro
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    map.fitBounds(bounds, { padding: 200 });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        }]
      }
    };

    if (map.getLayer(id)) {
      map.removeLayer(id);
      map.removeSource(id);
    }

    map.addSource(id, sourceData);
    map.addLayer({
      id: id,
      type: 'line',
      source: id,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'green',
        'line-width': 7
      }
    });
  }

  drawRoute(route: [number, number][], id: string): void {
    this.map$.subscribe(map => {
      const sourceData: AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }]
        }
      };

      if (map.getLayer(id)) {
        map.removeLayer(id);
        map.removeSource(id);
      }

      map.addSource(id, sourceData);
      map.addLayer({
        id: id,
        type: 'line',
        source: id,
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 6
        }
      });
    });
  }
}
