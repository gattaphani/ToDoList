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