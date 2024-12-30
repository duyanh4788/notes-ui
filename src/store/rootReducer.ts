import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './users/shared/slice';
import { loadingReducer } from './loading/slice';

const rootReducer = combineReducers({
  users: userReducer,
  loading: loadingReducer,
});

export default rootReducer;
