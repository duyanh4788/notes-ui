import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { configResponse, configResponseError } from 'services/request';
import { actions } from './slice';
import { TypeSaga } from 'commom/contants';
import { Notes } from 'interface/notes';
import { Helper } from 'utils/helper';
import { NotesHttps } from '../service/https';

const https = new NotesHttps();

export function* created(api, action) {
  try {
    const resPonse = yield call(api.created, action.payload);
    const data = yield configResponse(resPonse);
    yield configNotes(TypeSaga.CREATED, data.data);
  } catch (error) {
    yield put(actions.createdFail(configResponseError(error)));
  }
}

export function* createdChild(api, action) {
  try {
    const resPonse = yield call(api.createdChild, action.payload);
    const data = yield configResponse(resPonse);
    yield configNotes(TypeSaga.CREATED_CHILD, data.data);
  } catch (error) {
    yield put(actions.createdChildFail(configResponseError(error)));
  }
}

export function* updated(api, action) {
  try {
    const resPonse = yield call(api.updated, action.payload);
    const data = yield configResponse(resPonse);
    yield configNotes(TypeSaga.UPDATED, data.data);
  } catch (error) {
    yield put(actions.updatedFail(configResponseError(error)));
  }
}

export function* updatedOrderRing(api, action) {
  try {
    const resPonse = yield call(api.updated, action.payload);
    const data = yield configResponse(resPonse);
    yield configNotes(TypeSaga.UPDATED_ORDERING, data.data, action.payload);
  } catch (error) {
    yield put(actions.updatedOrderRingFail(configResponseError(error)));
  }
}

export function* deleted(api, action) {
  try {
    const resPonse = yield call(api.deleted, action.payload);
    const data = yield configResponse(resPonse);
    yield configNotes(TypeSaga.DELETED, data.data);
  } catch (error) {
    yield put(actions.deletedFail(configResponseError(error)));
  }
}

export function* getById(api, action) {
  try {
    const resPonse = yield call(api.getById, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.getByIdSuccess(data));
    yield configNotes(TypeSaga.UPDATED, data.data);
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

export function* countByUserId(api, action) {
  try {
    const resPonse = yield call(api.countByUserId, action.payload);
    const data = yield configResponse(resPonse);
    yield put(actions.countByUserIdSuccess(data));
  } catch (error) {
    yield put(actions.countByUserIdFail(configResponseError(error)));
  }
}

export function* addChildVitrual(action) {
  try {
    yield configNotes(TypeSaga.CREATED_CHILD, action.payload);
  } catch (_) {}
}

export function* updateChildVitrual(action) {
  try {
    yield configNotes(TypeSaga.UPDATED, action.payload);
  } catch (_) {}
}

export function* delChildVitrual(action) {
  try {
    yield configNotes(TypeSaga.DELETED, action.payload);
  } catch (_) {}
}

export function* NotesSaga() {
  yield all([
    yield takeLatest(actions.createdLoad.type, created, https),
    yield takeLatest(actions.createdChildLoad.type, createdChild, https),
    yield takeLatest(actions.updatedLoad.type, updated, https),
    yield takeLatest(actions.updatedOrderRingLoad.type, updatedOrderRing, https),
    yield takeLatest(actions.deletedLoad.type, deleted, https),
    yield takeLatest(actions.getByIdLoad.type, getById, https),
    yield takeLatest(actions.getAllLoad.type, getAll, https),
    yield takeLatest(actions.countByUserIdLoad.type, countByUserId, https),
    yield takeLatest(actions.addChildVitrual.type, addChildVitrual),
    yield takeLatest(actions.updateChildVitrual.type, updateChildVitrual),
    yield takeLatest(actions.delChildVitrual.type, delChildVitrual),
  ]);
}

function* configNotes(type: string, data: Notes, payload?: any) {
  const notesStore = yield select(state => state.notes);
  const { notes = [] } = notesStore;

  let result: Notes[] = [];

  switch (type) {
    case TypeSaga.CREATED:
      result = [...notes, { ...data }];
      break;
    case TypeSaga.CREATED_CHILD:
      result = Helper.createChild(notes, data);
      break;
    case TypeSaga.UPDATED:
      if (data.parentId) {
        result = Helper.updateChild(notes, data);
      } else {
        result = notes.map(note => (note.id === data.id ? { ...data } : note));
      }
      break;
    case TypeSaga.UPDATED_ORDERING:
      result = Helper.updateOrderRing(notes, data, payload);
      break;
    case TypeSaga.DELETED:
      if (data.parentId) {
        result = Helper.delChild(notes, data);
      } else {
        result = notes.filter(note => note.id !== data.id);
      }
      break;
    default:
      break;
  }
  const isUpdate = type === TypeSaga.UPDATED || TypeSaga.UPDATED_ORDERING || TypeSaga.CREATED_CHILD;
  yield put(actions.updateNotes({ notes: result, total: result.length, isUpdate }));
}
