import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'fireauth-angular-test',
  webDir: 'dist/fireauth-angular-test',
  server: {
    androidScheme: 'https'
  }
};

export default config;
