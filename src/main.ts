import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { registerPlugin } from '@capacitor/core';


import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; 
import { Capacitor } from '@capacitor/core';

Mapboxgl.accessToken = 'pk.eyJ1IjoibmFodW1sb3B6IiwiYSI6ImNsc3k2eGRlejBhYXIycm54YmxnaXlneTkifQ.wrnk_DcsIDYJ6a8OQSeE5Q';


if (!navigator.geolocation){
  alert('Navegador no soporta el Geolocation');
  throw new Error('Navegador no soporta el Geolocation');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
