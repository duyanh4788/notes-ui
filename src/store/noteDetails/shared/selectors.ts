import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectorNoteDetails = (state: RootState) => state?.noteDetails;

export const selectError = createSelector([selectorNoteDetails], state => state.error);
export const selectNoteDetail = createSelector([selectorNoteDetails], state => state.noteDetail);
export const selectNoteDetails = createSelector([selectorNoteDetails], state => state.noteDetails);
export const selectTotal = createSelector([selectorNoteDetails], state => state.total);
export const selectIsUpdate = createSelector([selectorNoteDetails], state => state.isUpdate);
