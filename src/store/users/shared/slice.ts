import { createSlice } from '@reduxjs/toolkit';
import { Banners, Users } from 'interface/users';

interface UserState {
  users: Users | null;
  banners: Banners[];
  urlGoolge: string | null;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  banners: [],
  urlGoolge: null,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signInLoad(state) {
      state.users = null;
      state.urlGoolge = null;
    },
    signInSuccess(state, action) {
      state.urlGoolge = action.payload.data;
    },
    signInFail(state, action) {
      state.error = action.payload;
    },

    getByIdLoad: state => {
      state.error = null;
    },
    getByIdSuccess: (state, action) => {
      state.users = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    signOutLoad() {},
    signOutSuccess(state, _) {
      state.users = null;
      state.urlGoolge = null;
    },
    signOutFail(state, action) {
      state.error = action.payload;
    },

    getBannersLoad: state => {
      state.error = null;
    },
    getBannersSuccess: (state, action) => {
      state.banners = action.payload.data;
    },
    getBannersFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { actions, reducer: userReducer, name: sliceKey } = userSlice;
