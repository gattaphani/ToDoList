import { coursesReducer } from "./courses.reducers";
import { CourseState } from "./courses.state";

export interface AppState { 
    course: CourseState;
}

export const AppReducer = {
    course: coursesReducer
}