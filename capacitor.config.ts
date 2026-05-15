import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.instaarena.app',
  appName: 'Zigzec',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'testingmainapp.vercel.app',
    cleartext: true
  }
};

export default config;
