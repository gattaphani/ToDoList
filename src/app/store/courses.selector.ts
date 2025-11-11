import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../Modal/courseModal';



// "count" must match the key you used in provideStore({ count: counterReducer })
export const selectCourseState =
  createFeatureSelector<CourseState>('course');

  // export const toggleState =
  // createFeatureSelector<CounterState>('toggle');

export const courseSelector = createSelector( 
  selectCourseState, (state) => state
); 