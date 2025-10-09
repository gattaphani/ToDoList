import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter.reducers';
import { employeeInterceptor } from '../app/Interceptors/Employee.Interceptor';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideHttpClient(
        withFetch(),
      // withInterceptors([employeeInterceptor])
    ),
      provideRouter(routes),
      provideClientHydration(),
      provideStore({ count: counterReducer })
    ]
};


