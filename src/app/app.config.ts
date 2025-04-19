import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyC6wZ8rRYwQwmXy2rl510NjsiA-ces-DVw',
  authDomain: 'kids-goods-angular-app.firebaseapp.com',
  projectId: 'kids-goods-angular-app',
  storageBucket: 'kids-goods-angular-app.firebasestorage.app',
  messagingSenderId: '364988524929',
  appId: '1:364988524929:web:e95b0565707c3e58a12080',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
// function provideFirebaseApp(): import("@angular/core").ImportProvidersSource {
//   throw new Error('Function not implemented.');
// }
