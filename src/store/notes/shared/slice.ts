import { createSlice } from '@reduxjs/toolkit';
import { Notes } from 'interface/notes';

interface NotesState {
  note: Notes | null;
  notes: Notes[];
  total: number;
  isUpdate: boolean;
  isLoad: boolean;
  error: string | null;
}

const initialState: NotesState = {
  note: null,
  notes: [],
  error: null,
  total: 0,
  isUpdate: false,
  isLoad: false,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createdLoad(_, __) {},
    createdSuccess(_, __) {},
    createdFail(state, action) {
      state.error = action.payload;
    },

    createdChildLoad(_, __) {},
    createdChildSuccess(_, __) {},
    createdChildFail(state, action) {
      state.error = action.payload;
    },

    updatedLoad(_, __) {},
    updatedSuccess(_, __) {},
    updatedFail(state, action) {
      state.error = action.payload;
    },

    deletedLoad(_, __) {},
    deletedSuccess(_, __) {},
    deletedFail(state, action) {
      state.error = action.payload;
    },

    getByIdLoad: (state, __) => {
      state.note = null;
    },
    getByIdSuccess: (state, action) => {
      state.note = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    getAllLoad(_, __) {},
    getAllSuccess(state, action) {
      state.notes = [...state.notes, ...action.payload.data.notes];
      state.total = action.payload.data.total;
    },
    getAllFail(state, action) {
      state.error = action.payload;
    },

    addChildVitrual(_, __) {},
    updateChildVitrual(_, __) {},
    delChildVitrual(_, __) {},

    updateNotes(state, action) {
      state.notes = action.payload.notes;
      state.total = action.payload.total;
      state.isUpdate = action.payload.isUpdate;
    },
    setIsUpdate(state, action) {
      state.isUpdate = action.payload;
    },
  },
});

export const { actions, reducer: noteReducer, name: sliceKey } = noteSlice;
