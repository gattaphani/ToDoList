import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './Modal/counter.reducers';
export const appConfig: ApplicationConfig = {
  providers:
    [
      provideHttpClient(withFetch()),
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withFetch()),
      provideStore({ count: counterReducer })
    ]
};


