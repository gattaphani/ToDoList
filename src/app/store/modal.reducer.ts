import { createReducer, on } from '@ngrx/store';
import { openModal, closeModal } from './modal.actions';

export interface ModalState {
  isOpen: boolean;
}

export const initialState: ModalState = {
  isOpen: false,
};

export const modalReducer = createReducer(
  initialState,
  on(openModal, state => {
    console.log('Reducer openModal called', state);
    return { ...state, isOpen: true };
  }),
  on(closeModal, state => {
    console.log('Reducer closeModal called', state);
    return { ...state, isOpen: false };
  })
);
