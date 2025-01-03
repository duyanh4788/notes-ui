import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { initialState } from './slice';

const selectLoading = (state: RootState) => state?.loading || initialState;

export const selectIsLoading = createSelector(
  [selectLoading],
  loadingState => loadingState.isLoading,
);
