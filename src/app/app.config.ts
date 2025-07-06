import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './core/custom-overlay-container';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: OverlayContainer, useClass: CustomOverlayContainer }, // Use custom overlay container
    provideHttpClient(),
  ],
};
