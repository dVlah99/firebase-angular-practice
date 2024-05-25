import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'beyondi-test-task-c992d',
        appId: '1:229862338829:web:868a084fe5eda0945c4044',
        storageBucket: 'beyondi-test-task-c992d.appspot.com',
        apiKey: 'AIzaSyBd4bR8_qAbOyRA9cDdKAbmGQUy1fU55ZI',
        authDomain: 'beyondi-test-task-c992d.firebaseapp.com',
        messagingSenderId: '229862338829',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
