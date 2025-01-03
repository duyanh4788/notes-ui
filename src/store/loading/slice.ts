import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { actions, reducer: loadingReducer, name: sliceKey } = loadingSlice;
