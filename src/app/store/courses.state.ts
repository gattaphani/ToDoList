import { Course } from "../Modal/courseModal";

export interface CourseState {
  courses: Course[];
  showModal: boolean;
  isEditMode: boolean;
}

export const initialCourseState: CourseState = {
  courses:[],
  showModal: false,
  isEditMode: false
};