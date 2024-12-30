import { all } from 'redux-saga/effects';
import { UserSaga } from './users/shared/saga';

export default function* rootSaga() {
  yield all([UserSaga()]);
}
