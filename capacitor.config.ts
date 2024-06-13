import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.triptrove.app',
  appName: 'TripTroveAngular',
  webDir: 'dist/fireauth-angular-test',
  server: {
    androidScheme: 'https'
  }
};

export default config;
