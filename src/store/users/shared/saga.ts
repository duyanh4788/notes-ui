import { call, put, takeLatest, all } from 'redux-saga/effects';
import { configResponse, configResponseError } from 'services/request';
import { UserHttps } from '../service/usersHttps';
import { actions } from './slice';

const https = new UserHttps();
export function* signIn(api, action) {
  try {
    const resPonse = yield call(api.signIn, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.signInSuccess(data));
  } catch (error) {
    yield put(actions.signInFail(configResponseError(error)));
  }
}

export function* getById(api, action) {
  try {
    const resPonse = yield call(api.getById, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.getByIdSuccess(data));
  } catch (error) {
    yield put(actions.getByIdFail(configResponseError(error)));
  }
}

export function* signOut(api, action) {
  try {
    yield call(api.signOut, action.payload);
  } catch (error) {
    yield put(actions.signOutFail(configResponseError(error)));
  }
}

export function* UserSaga() {
  yield all([
    yield takeLatest(actions.signIn.type, signIn, https),
    yield takeLatest(actions.getById.type, getById, https),
    yield takeLatest(actions.signOut.type, signOut, https),
  ]);
}
