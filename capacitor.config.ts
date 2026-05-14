import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.instaarena.app',
  appName: 'InstaArena',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'testingmainapp.vercel.app'
  }
};

export default config;
