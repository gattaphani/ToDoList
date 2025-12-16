import { createReducer, on } from "@ngrx/store";
import { addCourse, addCourseSuccess, deleteCourse, deleteCourseSuccess, getCourses,
loadCourses, loadCoursesSuccess, selectedCourseAction, setEditModeAction, showModalAction, updateCourse, 
updateCourseSuccess } from "./courses.actions";
import { CourseState, initialCourseState } from "./courses.state";



// export const initialCourseState: Course[] = [];

// export const showModalReducer = createReducer(
//   initialCourseState,
//   on(showModalAction, (state, action) => {
//     console.log('Reducer showModalAction called:', action.value);
//     return {
//       ...state, 
//       showModal: action.value
//     };
//   }),
// );

export const coursesReducer = createReducer<CourseState>(
  initialCourseState,

  on(showModalAction, (state, action) => {
    console.log('Reducer showModalAction called:', action.value);
    return {
      ...state,
      showModal: action.value
    };
  }),

  on(setEditModeAction, (state,  action) => {
    console.log('Reducer setEditMode called:', action.isEditMode);
    return {  ...state, isEditModeState: action.isEditMode  };
  }),

  on(loadCourses, (state) => {
    console.log('Reducer loadCourses called:', state);
    return state;
  }),

  on(loadCoursesSuccess, (state, { courses }) => {
    return { ...state, courses: courses };
  }),

  on(addCourse, (state, { course }) => {
    console.log('Reducer addCourse called:', course);
    return { ...state, courses: [...state.courses, course] };
  }),
  on(addCourseSuccess, (state, { course }) => {
    console.log('Reducer addCourseSuccess called:', course);
    return { ...state, courses: [...state.courses, course] };
  }),

  on(selectedCourseAction, (state, { course }) => {
    console.log('Reducer selectedCourse called:', course);
    return { ...state, selectedCourse: course };
  }),
  
  on(updateCourse, (state, { course }) => {
    console.log('Reducer updateCourse called:', course);
    return { ...state, courses: state.courses.map(c => c.id === course.id ? course : c) };
  }),
  on(updateCourseSuccess, (state, { course }) => {
    console.log('Reducer updateCourseSuccess called:', course);
    return { ...state, courses: state.courses.map(c => c.id === course.id ? course : c) };
  }),

  on(deleteCourse, (state, { id }) => {
    console.log('Reducer addCourse called:', id);
    if (id == null) return state;
    return { ...state, courses: state.courses.filter(c => c.id !== id) };
  }),

  on(deleteCourseSuccess, (state, { id }) => {
    console.log('Reducer addCourseSuccess called:', id);
    if (id == null) return state;
    return { ...state, courses: state.courses.filter(c => c.id !== id) };
  })

);