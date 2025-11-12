import { createAction, props } from "@ngrx/store";
import { CourseState } from "../Modal/courseModal";

export const getCourses = createAction('Get Courses');
console.log('Get Courses action created', getCourses);

export const loadCourses = createAction('[Courses] Load Courses');
console.log('Load Courses action created', loadCourses);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: CourseState[] }>()
);
console.log('Load Courses Success action created', loadCoursesSuccess);

export const addCourse = createAction(
  '[Courses] Add',
  props<{ course: CourseState }>()
);
export const addCourseSuccess = createAction(
  '[Courses] Add Success',
  props<{ course: CourseState }>()
);


export const updateCourse = createAction(
  '[Courses] Update',
  props<{ course: CourseState }>()
);
export const updateCourseSuccess = createAction(
  '[Courses] Update Success',
  props<{ course: CourseState }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete',
  props<{ id: string| number| undefined }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Success',
  props<{id: string| number| undefined }>()
);


