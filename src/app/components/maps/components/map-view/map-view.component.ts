import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class  MapViewComponent implements AfterViewInit{

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private placesService : PlacesService,
    private mapService: MapService
    ){

  }

  ngAfterViewInit(): void{
    if(!this.placesService.userLocation) throw Error('No hat placesServices.location')

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
    const popup = new Popup()
      .setHTML('<h6>Aqui Estoy</h6><br><span>Estoy en este lugar del mundo</span>');
      new Marker({ color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map)
      this.mapService.setMap( map );
    const popupMuse = new Popup()
      .setHTML('<h6>')
  }


}
