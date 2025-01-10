import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './users/shared/slice';
import { loadingReducer } from './loading/slice';
import { noteReducer } from './notes/shared/slice';
import { noteDetailsReducer } from './noteDetails/shared/slice';

const rootReducer = combineReducers({
  loading: loadingReducer,
  users: userReducer,
  notes: noteReducer,
  noteDetails: noteDetailsReducer,
});

export default rootReducer;
