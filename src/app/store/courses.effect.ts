import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../services/Course/course';
import { loadCourses, loadCoursesSuccess } from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export const loadCoursesEffect = createEffect(
  (
    actions$ = inject(Actions),
    courseService = inject(CourseService)
  ) => {
    return actions$.pipe(
      ofType(loadCourses),
      mergeMap(() => 
        courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })))
      )
    );
  },
  { functional: true }
);
