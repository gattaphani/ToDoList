import { createAction, props } from "@ngrx/store";

export const getCourses = createAction('Get Courses');
console.log('Get Courses action created', getCourses);