import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.salaires.app',
    appName: 'Suivi Salaires',
    webDir: '.output/public',
    server: {
        androidScheme: 'https'
    }
};

export default config;
