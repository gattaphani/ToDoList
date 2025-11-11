import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalState } from './modal.reducer';

export const selectModalState = createFeatureSelector<ModalState>('modal');

export const selectIsModalOpen = createSelector(
  selectModalState,
  state => state.isOpen
);
console.log('Selector selectIsModalOpen created', selectIsModalOpen);