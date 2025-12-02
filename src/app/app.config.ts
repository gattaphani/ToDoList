import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter.reducers';
import { employeeInterceptor } from '../app/Interceptors/Employee.Interceptor';
import { modalReducer } from './store/modal.reducer';
import { coursesReducer } from './store/courses.reducers';
import { addCourseEffect, deleteCourseEffect, loadCoursesEffect, updateCourseEffect } from './store/courses.effect';
import { provideEffects } from '@ngrx/effects';
import { showModalSelector } from './store/courses.selector';
import { AppComponent } from './app.component';
import { AppReducer } from './store/app.state';
import { TruncatePipe } from './Pipe/truncate-pipe';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideHttpClient(
        withFetch(),
      // withInterceptors([employeeInterceptor])
    ),
      
      provideRouter(routes),
      provideClientHydration(),
      provideStore( AppReducer),
      provideEffects({ loadCoursesEffect,addCourseEffect,updateCourseEffect,deleteCourseEffect })
    ]
};


