import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { configResponse, configResponseError } from 'services/request';
import { actions } from './slice';
import { NoteDetailsHttps } from '../service/https';
import { TypeSaga } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';

const https = new NoteDetailsHttps();

export function* created(api, action) {
  try {
    const resPonse = yield call(api.created, action.payload);
    yield configResponse(resPonse);
  } catch (error) {
    yield put(actions.createdFail(configResponseError(error)));
  }
}

export function* updated(api, action) {
  try {
    const resPonse = yield call(api.updated, action.payload);
    yield configResponse(resPonse);
  } catch (error) {
    yield put(actions.updatedFail(configResponseError(error)));
  }
}

export function* deleted(api, action) {
  try {
    const resPonse = yield call(api.deleted, action.payload);
    yield configResponse(resPonse);
  } catch (error) {
    yield put(actions.deletedFail(configResponseError(error)));
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

export function* getAll(api, action) {
  try {
    const resPonse = yield call(api.getAll, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.getAllSuccess(data));
  } catch (error) {
    yield put(actions.getAllFail(configResponseError(error)));
  }
}

export function* addVitrual(action) {
  try {
    yield configNotes(TypeSaga.CREATED, action.payload);
  } catch (_) {}
}

export function* delVitrual(action) {
  try {
    yield configNotes(TypeSaga.DELETED, action.payload);
  } catch (_) {}
}

export function* NoteDetailsSaga() {
  yield all([
    yield takeLatest(actions.created.type, created, https),
    yield takeLatest(actions.updated.type, updated, https),
    yield takeLatest(actions.deleted.type, deleted, https),
    yield takeLatest(actions.getById.type, getById, https),
    yield takeLatest(actions.getAll.type, getAll, https),
    yield takeLatest(actions.addVitrual.type, addVitrual),
    yield takeLatest(actions.delVitrual.type, delVitrual),
  ]);
}

function* configNotes(type: string, data: NoteDetails) {
  const noteDetailsStore = yield select(state => state.noteDetails);
  const { noteDetails = [] } = noteDetailsStore;

  let result: NoteDetails[] = [];

  switch (type) {
    case TypeSaga.CREATED:
      result = [...noteDetails, { ...data }];
      break;
    case TypeSaga.DELETED:
      result = noteDetails.filter(note => !note.isVitrual);
      break;
    default:
      break;
  }
  const isUpdate = type === TypeSaga.UPDATED || TypeSaga.CREATED_CHILD;
  yield put(actions.updateNotes({ noteDetails: result, total: result.length, isUpdate }));
}
