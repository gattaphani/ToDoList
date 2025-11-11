import { createReducer, on } from "@ngrx/store";
import { getCourses } from "./courses.actions";
import { initialCourseState } from "../Modal/courseModal";



export const coursesReducer = createReducer(
  initialCourseState,
  on(getCourses, (state) => {
    console.log('Reducer getCourses called:', state);
    return {
      ...state
    };
  })
)