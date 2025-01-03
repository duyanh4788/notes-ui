import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectorNotes = (state: RootState) => state?.notes;

export const selectError = createSelector([selectorNotes], state => state.error);
export const selectNote = createSelector([selectorNotes], state => state.note);
export const selectNotes = createSelector([selectorNotes], state => state.notes);
export const selectTotal = createSelector([selectorNotes], state => state.total);
export const selectIsUpdate = createSelector([selectorNotes], state => state.isUpdate);
