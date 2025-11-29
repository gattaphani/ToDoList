import { Course } from "../Modal/courseModal";

export interface CourseState {
  courses: Course[];
  showModal: boolean;
}

export const initialCourseState: CourseState = {
  courses:[],
  showModal: false
};