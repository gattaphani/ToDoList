import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, addValue, toggle } from './counter.actions';
import { initialState } from '../Modal/counter.state';



export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    console.log('Reducer increment called');
    console.log('Reducer increment called with state:initialState, state', initialState, state);
     return { 
      ...state, count: state.count + 1 
    }
   }),
  on(decrement, (state) => {
    console.log('Reducer decrement called');
    console.log('Reducer decrement called with state:initialState, state', initialState, state);
    return { 
      ...state, count: state.count - 1 
    }
  }),
  on(reset, (state) => {
    console.log('Reducer reset called');
    console.log('Reducer reset called with state:initialState, state', initialState, state);
    return {
      ...state, count: 0
    }
  }),
  on(addValue, (state, { value }) => {
    console.log('Reducer addValue called with state and value:initialState, state, value', initialState, state, value);
    return {
      ...state, count: state.count + value
    
    }
  }),
  on(toggle, (state,{ toggleValue }) => {
    console.log('Reducer toggle called');
    console.log('Reducer toggle called with state:initialState, state', initialState, state);
    return {
      ...state, toggle: toggleValue
    }
  }),
  // on(getCourses, (state) => {
  //   console.log('Reducer getCourses called');
  //   console.log('Reducer getCourses called with state:initialState, state', initialState, state);
  //   return {
  //     ...state
  //   }
  // })
);
  
