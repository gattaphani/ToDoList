import { createReducer, on } from "@ngrx/store";
import { addCourse, addCourseSuccess, deleteCourse, deleteCourseSuccess, getCourses, loadCourses, loadCoursesSuccess, updateCourse, updateCourseSuccess } from "./courses.actions";
import { CourseState } from "../Modal/courseModal";



// export const coursesReducer = createReducer(
//   initialCourseState,
//   on(loadCourses, (state) => {
//     console.log('Reducer loadCourses called:', state);
//     return {
//       ...state
//     };
//   })
// )

export const initialCourseState: CourseState[] = [];

export const coursesReducer = createReducer(
  initialCourseState,
  on(loadCourses, (state) => {
    console.log('Reducer loadCourses called:', state);
    return [...state];
  }),
  on(loadCoursesSuccess, (state, { courses }) => {
    console.log('Reducer loadCoursesSuccess called:', courses);
    return [...courses];
  }),

  on(addCourse, (state, { course }) => {
    console.log('Reducer addCourse called:', course);
    return [...state, course];
  }),
  on(addCourseSuccess, (state, { course }) => {
    console.log('Reducer addCourseSuccess called:', course);
    return [...state, course];
  }),

    on(updateCourse, (state, { course }) => {
    console.log('Reducer addCourse called:', course);
    return [...state, course];
  }),
  on(updateCourseSuccess, (state, { course }) => {
    console.log('Reducer addCourseSuccess called:', course);
    return [...state, course];
  }),
  
    on(deleteCourse, (state, { id }) => {
    console.log('Reducer addCourse called:', id);
     if (id == null) return state;
    return state.filter(c => c.id !== id);
  }),
  on(deleteCourseSuccess, (state, { id }) => {
    console.log('Reducer addCourseSuccess called:', id);
     if (id == null) return state;
    return state.filter(c => c.id !== id);
  })
  
);