export interface CourseState {
  courseName: string;
  instructor: string;
  duration: number;
  rating: number;
  description: string;
  url: string;
  id?: string| number
}
export const initialCourseState: CourseState []= [];

export const initialCourse: CourseState = {
  courseName: '',
  instructor: '',
  duration: 0,
  rating: 0,
  description: '',
  url: ''
};

