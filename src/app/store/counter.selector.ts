import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../Modal/counter.state';


// "count" must match the key you used in provideStore({ count: counterReducer })
export const selectCounterState =
  createFeatureSelector<CounterState>('count');

export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.count
);
