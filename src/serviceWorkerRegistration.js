// src/serviceWorkerRegistration.js

import { Workbox } from 'workbox-window';

export function register() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');

    wb.register()
      .then(() => {
        console.log('Service Worker registered');
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
      });
  }
}
