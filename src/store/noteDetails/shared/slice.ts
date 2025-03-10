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
    createdLoad(_, __) {},
    createdSuccess() {},
    createdFail(state, action) {
      state.error = action.payload;
    },

    uploadFileLoad(_, __) {},
    uploadFileSuccess() {},
    uploadFileFail(state, action) {
      state.error = action.payload;
    },

    updatedLoad(_, __) {},
    updatedSuccess() {},
    updatedFail(state, action) {
      state.error = action.payload;
    },

    deletedLoad(_, __) {},
    deletedSuccess() {},
    deletedFail(state, action) {
      state.error = action.payload;
    },

    getByIdLoad: (state, __) => {
      state.noteDetail = null;
    },
    getByIdSuccess: (state, action) => {
      state.noteDetail = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    getAllLoad(_, __) {},
    getAllSuccess(state, action) {
      state.noteDetails = action.payload.noteDetails;
      state.total = action.payload.total;
      state.noteId = action.payload.noteId;
    },
    getAllFail(state, action) {
      state.error = action.payload;
    },

    searchLoad: (_, __) => {},
    searchSuccess: (state, action) => {
      state.noteDetails = action.payload.data.noteDetails;
      state.total = action.payload.data.total;
      state.noteId = null;
    },
    searchFail: (state, action) => {
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

    clearNoteDetails(state) {
      state.noteDetails = [];
      state.noteDetail = null;
    },
  },
});

export const { actions, reducer: noteDetailsReducer, name: sliceKey } = noteDetailsSlice;
