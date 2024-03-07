import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route} from '../interfaces/directions';
import { Geometry } from '../interfaces/distance';
import { DistanceApiClient } from '../api/distanceApiClient';
 
@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private  markers: Marker[] = []
  stepsAsString: string = '';

  get isMapReady(){
    return !!this.map
  }

  constructor(private directionsApi: DirectionsApiClient,
    private distanceApi: DistanceApiClient) {}

  setMap( map: Map){
    this.map= map;
  }

  flyTo( coords: LngLatLike){
    if( !this.isMapReady) throw Error('El mapa  no esta inicializado');

    this.map?.flyTo({
      zoom: 16,
      pitch: 40,
      essential: true,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[],userLocation:[number,number]) {
    if (!this.map) throw Error("Mapa no inicializado");
    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`<h6>${place.text}</h6><br><span>${place.place_name}</span>`);
      const newMarker = new Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.map);
      newMarkers.push(newMarker); 
    }
    this.markers = newMarkers;
    if ( places.length == 0) return;
    const bounds = new LngLatBounds()
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation)
    this.map.fitBounds(bounds, { padding: 200})
  }  



  getRouteBetweenPoints(transport : String,start:[ number, number],end: [number,number] ){
    this.directionsApi.get<DirectionsResponse>(`/${transport}/${start.join(',')};${end.join(',')}`)
    .subscribe(resp => this.drawPolyline(resp.routes[0] ) ) ;
  }



  private drawPolyline(route: Route){
    //pasos consola
    const steps = route.legs[0].steps;
    console.log('Instrucciones de la Ruta:');
    for (const step of steps) {
      console.log(step.maneuver.instruction);
    }

    //mapa distancia y tiempo
    console.log({kms: route.distance / 1000 , duration: route.duration / 60})
    
    //mapa cargado
    if(!this.map) throw Error('Mapa no inicializado');

    //iniciar una variable coords con las coordenadas de la ruta 
    const coords = route.geometry.coordinates;

    //Inicia una nueva varible bounds con las variables 
    const bounds = new LngLatBounds();

    //bounds obtiene coords
    coords.forEach(([lng,lat]) =>  bounds.extend([lng, lat]));
    
    //el mapa se le coloca bounds con un padding de 200
    this.map?.fitBounds( bounds,{padding: 200})
    
    const sourceData: AnySourceData ={  
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features: [
          {
            type:'Feature',
            properties: {},
            geometry: {
              type:'LineString',
              coordinates: coords

            }
          }
        ]
      }
    }

    if(this.map.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id:'RouteString',
      type: 'line',
      source: 'RouteString',
      layout:{
        'line-cap': 'round',
        'line-join': 'round'
      },paint:{
        'line-color': 'green',
        'line-width': 7
      }
    });
  }

   distancePolyline(selectedTime:String){
    //mapa cargado
    if(!this.map) throw Error('Mapa no inicializado');

    //Inicia una nueva varible bounds con las variables 
    const bounds = new LngLatBounds();
    
    //el mapa se le coloca bounds con un padding de 200
    this.map?.fitBounds( bounds,{padding: 200})
   
    if(this.map.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addLayer({
      id:'RouteString',
      type: 'line',
      source: 'RouteString',
      layout:{
        'line-cap': 'round',
        'line-join': 'round'
      },paint:{
        'line-color': 'green',
        'line-width': 7
      }
    });
  }
}
