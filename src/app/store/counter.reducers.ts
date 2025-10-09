import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, addValue } from './counter.actions';

export const initialState = { 
    count: 0 
};

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );


// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1)
// );

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(reset, (state) => ({ ...state, count: 0 })) ,
  on(addValue, (state, { value }) => (
    { 
      ...state, count: state.count + value 
    }
  ))
  
);