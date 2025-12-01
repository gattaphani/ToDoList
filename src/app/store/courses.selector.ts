import { createFeatureSelector, 
createSelector } from '@ngrx/store';
import { CourseState } from './courses.state';



// "count" must match the key you used in provideStore({ count: counterReducer })
export const selectCourseState =
  createFeatureSelector<CourseState>('course');



export const courseSelector = createSelector( 
  selectCourseState, (state) => state.courses
); 


export const showModalSelector = createSelector(
  selectCourseState, (state) => state.showModal
);

export const isEditModeSelector = createSelector(
  selectCourseState, (state) => state.isEditMode
);