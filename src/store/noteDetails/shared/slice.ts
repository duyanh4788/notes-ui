import { createSlice } from '@reduxjs/toolkit';
import { NoteDetails } from 'interface/noteDetails';
interface NoteDetailsState {
  noteDetail: NoteDetails | null;
  noteDetails: NoteDetails[];
  total: number;
  isUpdate: boolean;
  noteId: string | null;
  error: string | null;
}

const initialState: NoteDetailsState = {
  noteDetail: null,
  noteDetails: [],
  total: 0,
  isUpdate: false,
  noteId: null,
  error: null,
};

const noteDetailsSlice = createSlice({
  name: 'noteDetails',
  initialState,
  reducers: {
    created(_, __) {},
    createdSuccess(_, __) {},
    createdFail(state, action) {
      state.error = action.payload;
    },

    updated(_, __) {},
    updatedSuccess(_, __) {},
    updatedFail(state, action) {
      state.error = action.payload;
    },

    deleted(_, __) {},
    deletedSuccess(_, __) {},
    deletedFail(state, action) {
      state.error = action.payload;
    },

    getById: (state, __) => {
      state.noteDetail = null;
    },
    getByIdSuccess: (state, action) => {
      state.noteDetail = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    getAll(_, __) {},
    getAllSuccess(state, action) {
      state.noteDetails = action.payload.data.noteDetails;
      state.total = action.payload.data.total;
      state.noteId = action.payload.data.noteId;
    },
    getAllFail(state, action) {
      state.error = action.payload;
    },

    addVitrual(_, __) {},
    delVitrual(_, __) {},
    updateVitrual(_, __) {},
    updateNoteDetails(state, action) {
      state.noteDetails = action.payload.noteDetails;
      state.total = action.payload.total;
      state.isUpdate = action.payload.isUpdate;
    },
    setIsUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    clearNoteDetails(state, action) {
      state.noteDetails = action.payload;
      state.total = 0;
    },
  },
});

export const { actions, reducer: noteDetailsReducer, name: sliceKey } = noteDetailsSlice;
