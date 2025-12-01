import { CounterState } from "../Modal/counter.state";
import { counterReducer } from "./counter.reducers";
import { coursesReducer } from "./courses.reducers";
import { CourseState } from "./courses.state";

export interface AppState { 
    course: CourseState;
    counter: CounterState;
}

export const AppReducer = {
    course: coursesReducer,
    counter: counterReducer
}