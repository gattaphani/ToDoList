export interface CourseState {
  courseName: string;
  instructor: string;
  duration: number;
  rating: number;
  description: string;
  url: string;
}
export const initialCourseState: CourseState = {
  courseName: '',
  instructor: '',
  duration: 0,
  rating: 0,
  description: '',
  url: ''
};