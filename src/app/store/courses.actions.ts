import { createAction, props } from "@ngrx/store";
import { Course } from "../Modal/courseModal";


export const showModalAction = createAction('Show Modal', props<{ value: boolean }>());
// export const hideModalAction = createAction('Hide Modal', props<{ value: boolean }>());

export const setEditModeAction = createAction('Set Edit Mode', props<{ isEditMode: boolean }>());

export const getCourses = createAction('Get Courses');
console.log('Get Courses action created', getCourses);

export const loadCourses = createAction('[Courses] Load Courses');
console.log('Load Courses action created', loadCourses);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
console.log('Load Courses Success action created', loadCoursesSuccess);

export const addCourse = createAction(
  '[Courses] Add',
  props<{ course: Course }>()
);

export const addCourseSuccess = createAction(
  '[Courses] Add Success',
  props<{ course: Course }>()
);


export const updateCourse = createAction(
  '[Courses] Update',
  props<{ course: Course }>()
);
export const updateCourseSuccess = createAction(
  '[Courses] Update Success',
  props<{ course: Course }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete',
  props<{ id: string| number| undefined }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Success',
  props<{id: string| number| undefined }>()
);

export const selectedCourseAction = createAction(
  '[Courses] Selected',
  props<{ course: Course | null }>()
);


