import { createAction, props } from '@ngrx/store';

export const increment = createAction('Increment');
console.log('Increment action created', increment);

export const decrement = createAction('Decrement');
console.log('Decrement action created', decrement);

export const reset = createAction('Reset');
console.log('Reset action created', reset); 

export const addValue = createAction('Add Value', props<{ value: number }>());
console.log('Add Value action created', addValue);

export const toggle = createAction('Toggle', props<{ toggleValue: boolean }>());
console.log('Toggle action created', toggle);



