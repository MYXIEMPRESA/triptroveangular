import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';


if (!navigator.geolocation){
  alert('Navegador no soporta el Geolocation');
  throw new Error('Navegador no soporta el Geolocation');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
