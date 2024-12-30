import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectUsers = (state: RootState) => state?.users;

export const selectError = createSelector([selectUsers], state => state.error);
export const selectUserInfor = createSelector([selectUsers], state => state.users);
export const selectUrlGg = createSelector([selectUsers], state => state.urlGoolge);
