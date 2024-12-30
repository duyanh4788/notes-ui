import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  loadings: boolean;
}

export const initialState: LoadingState = {
  loadings: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.loadings = true;
    },
    stopLoading(state) {
      state.loadings = false;
    },
  },
});

export const { actions, reducer: loadingReducer, name: sliceKey } = loadingSlice;
