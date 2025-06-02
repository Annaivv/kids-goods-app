import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

// const firebaseConfig = {
//   apiKey: process.env['FIREBASE_API_KEY'],
//   authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
//   projectId: process.env['FIREBASE_PROJECT_ID'],
//   storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
//   messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
//   appId: process.env['FIREBASE_APP_ID'],
// };
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
