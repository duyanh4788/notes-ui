import { createSlice } from '@reduxjs/toolkit';
import { Users } from 'interface/users';

interface UserState {
  users: Users | null;
  urlGoolge: string | null;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  urlGoolge: null,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signIn(state) {
      state.users = null;
      state.urlGoolge = null;
    },
    signInSuccess(state, action) {
      state.urlGoolge = action.payload.data;
    },
    signInFail(state, action) {
      state.error = action.payload;
    },

    getById: state => {
      state.error = null;
    },
    getByIdSuccess: (state, action) => {
      state.users = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    signOut() {},
    signOutSuccess(state, _) {
      state.users = null;
      state.urlGoolge = null;
    },
    signOutFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const { actions, reducer: userReducer, name: sliceKey } = userSlice;
