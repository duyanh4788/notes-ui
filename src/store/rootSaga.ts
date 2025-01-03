import { all } from 'redux-saga/effects';
import { UserSaga } from './users/shared/saga';
import { NotesSaga } from './notes/shared/saga';

export default function* rootSaga() {
  yield all([UserSaga(), NotesSaga()]);
}
