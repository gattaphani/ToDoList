import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../Modal/counter.state';


// "count" must match the key you used in provideStore({ count: counterReducer })
export const selectCounterState =
  createFeatureSelector<CounterState>('counter');
 

export const counterSelector = createSelector( 
  selectCounterState, (state) => state.count
);
console.log('Selector counterSelector created', counterSelector);

export const toggleSelector = createSelector(
  selectCounterState, (state) => state.toggle
);
console.log('Selector toggleSelector created', toggleSelector);



