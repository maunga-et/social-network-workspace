import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { authReducer, PostEffects, postReducer } from '@social-network-workspace/core';
import { AuthEffects } from '@social-network-workspace/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ auth: authReducer, posts: postReducer }),
    provideEffects([AuthEffects, PostEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
