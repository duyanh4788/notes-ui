import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { configResponse, configResponseError } from 'services/request';
import { actions } from './slice';
import { NoteDetailsHttps } from '../service/https';
import { TypeSaga } from 'commom/contants';
import { NoteDetails, ResNoteDetails } from 'interface/noteDetails';

const https = new NoteDetailsHttps();

export function* created(api, action) {
  try {
    const resPonse = yield call(api.created, action.payload);
    const data = yield configResponse(resPonse);
    yield configData(TypeSaga.CREATED, data.data);
  } catch (error) {
    yield put(actions.createdFail(configResponseError(error)));
  }
}

export function* updated(api, action) {
  try {
    const resPonse = yield call(api.updated, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.getByIdSuccess(data));
    yield configData(TypeSaga.UPDATED, data.data);
  } catch (error) {
    yield put(actions.updatedFail(configResponseError(error)));
  }
}

export function* deleted(api, action) {
  try {
    const resPonse = yield call(api.deleted, action.payload);
    const data = yield configResponse(resPonse);
    yield configData(TypeSaga.DELETED, data.data);
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
    const newData = yield configGetAll(data.data);
    yield put(actions.getAllSuccess(newData));
  } catch (error) {
    yield put(actions.getAllFail(configResponseError(error)));
  }
}

export function* search(api, action) {
  try {
    const resPonse = yield call(api.search, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.searchSuccess(data));
  } catch (error) {
    yield put(actions.searchFail(configResponseError(error)));
  }
}

export function* addVitrual(action) {
  try {
    yield configData(TypeSaga.CREATED, action.payload);
  } catch (_) {}
}

export function* updateVitrual(action) {
  try {
    yield configData(TypeSaga.UPDATED, action.payload);
  } catch (_) {}
}

export function* delVitrual(action) {
  try {
    yield configData(TypeSaga.DELETED, action.payload);
  } catch (_) {}
}

export function* NoteDetailsSaga() {
  yield all([
    yield takeLatest(actions.createdLoad.type, created, https),
    yield takeLatest(actions.updatedLoad.type, updated, https),
    yield takeLatest(actions.deletedLoad.type, deleted, https),
    yield takeLatest(actions.getByIdLoad.type, getById, https),
    yield takeLatest(actions.getAllLoad.type, getAll, https),
    yield takeLatest(actions.searchLoad.type, search, https),
    yield takeLatest(actions.addVitrual.type, addVitrual),
    yield takeLatest(actions.updateVitrual.type, updateVitrual),
    yield takeLatest(actions.delVitrual.type, delVitrual),
  ]);
}

function* configData(type: string, data: NoteDetails) {
  const noteDetailsStore = yield select(state => state.noteDetails);
  const { noteDetails = [] } = noteDetailsStore;

  let result: NoteDetails[] = [];

  switch (type) {
    case TypeSaga.CREATED:
      result = [{ ...data }, ...noteDetails];
      break;
    case TypeSaga.UPDATED:
      result = noteDetails.map(detail => (detail.id === data.id ? { ...data } : detail));
      break;
    case TypeSaga.DELETED:
      result = noteDetails.filter(detail => detail.id !== data.id);
      break;
    default:
      break;
  }
  const isUpdate = type === TypeSaga.UPDATED || TypeSaga.CREATED_CHILD;
  yield put(actions.updateNoteDetails({ noteDetails: result, total: result.length, isUpdate }));
}

function* configGetAll(data: ResNoteDetails) {
  const noteDetailsStore = yield select(state => state.noteDetails);
  const { noteDetails = [], noteId } = noteDetailsStore;
  if (!noteId || (noteId && noteId !== data.noteId)) {
    return data;
  }
  data.noteDetails = [...noteDetails, ...data.noteDetails];
  return data;
}
