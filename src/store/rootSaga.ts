import { all } from 'redux-saga/effects';
import { UserSaga } from './users/shared/saga';
import { NotesSaga } from './notes/shared/saga';
import { NoteDetailsSaga } from './noteDetails/shared/saga';

export default function* rootSaga() {
  yield all([UserSaga(), NotesSaga(), NoteDetailsSaga()]);
}
