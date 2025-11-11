import { createReducer, on } from "@ngrx/store";
import { getCourses, loadCourses, loadCoursesSuccess } from "./courses.actions";
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
  })
);