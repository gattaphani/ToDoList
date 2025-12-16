import { Course } from "../Modal/courseModal";

export interface CourseState {
  courses: Course[];
  showModal: boolean;
  isEditModeState: boolean;
  selectedCourse: Course | null;
}

export const initialCourseState: CourseState = {
  courses:[],
  showModal: false,
  isEditModeState: false,
  selectedCourse: null,
};