import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectorNotes = (state: RootState) => state?.users;

export const selectError = createSelector([selectorNotes], state => state.error);
export const selectUserInfor = createSelector([selectorNotes], state => state.users);
export const selectUrlGg = createSelector([selectorNotes], state => state.urlGoolge);
export const selectBanner = createSelector([selectorNotes], state => state.banners);
