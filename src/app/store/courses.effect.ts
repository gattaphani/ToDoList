import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../services/Course/course';
import { addCourse, addCourseSuccess, deleteCourse, deleteCourseSuccess, 
loadCourses, loadCoursesSuccess, updateCourse, updateCourseSuccess } from './courses.actions';
import { map, mergeMap } from 'rxjs';

export const loadCoursesEffect = createEffect(
  (
    actions$ = inject(Actions),
    courseService = inject(CourseService)
  ) => {
    return actions$.pipe(
      ofType(loadCourses),
      mergeMap(() => 
        courseService.getCoursesService().pipe(
          map(courses => loadCoursesSuccess({ courses })))
      )
    );
  },
  { functional: true }
);

export const addCourseEffect = createEffect(
  (actions$ = inject(Actions), service = inject(CourseService)) => {
    return actions$.pipe(
      ofType(addCourse),
      mergeMap(({ course }) =>
        service.addCourseService(course).pipe(
          map(newCourse => addCourseSuccess({ course: newCourse }))
        )
      )
    );
  },
  { functional: true }
);

export const updateCourseEffect = createEffect(
  (actions$ = inject(Actions), service = inject(CourseService)) => {
    return actions$.pipe(
      ofType(updateCourse),
      mergeMap(({ course }) =>
        service.updateCourseService(course).pipe(
          map(newCourse => updateCourseSuccess({ course: newCourse }))
        )
      )
    );
  },
  { functional: true }
);

export const deleteCourseEffect = createEffect(
  (actions$ = inject(Actions), service = inject(CourseService)) => {
    return actions$.pipe(
      ofType(deleteCourse),
      mergeMap(({ id }) =>
        service.deleteCourseService(id!).pipe(
          map(newCourse => deleteCourseSuccess({id}))
        )
      )
    );
  },
  { functional: true }
);