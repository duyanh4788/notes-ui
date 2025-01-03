import { createSlice } from '@reduxjs/toolkit';
import { Notes } from 'interface/notes';

interface NotesState {
  note: Notes | null;
  notes: Notes[];
  total: number;
  isUpdate: boolean;
  error: string | null;
}

const initialState: NotesState = {
  note: null,
  notes: [],
  error: null,
  total: 0,
  isUpdate: false,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    created(_, __) {},
    createdSuccess(_, __) {},
    createdFail(state, action) {
      state.error = action.payload;
    },

    createdChild(_, __) {},
    createdChildSuccess(_, __) {},
    createdChildFail(state, action) {
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

    getById: (_, __) => {},
    getByIdSuccess: (state, action) => {
      state.note = action.payload.data;
    },
    getByIdFail: (state, action) => {
      state.error = action.payload;
    },

    getAll(_, __) {},
    getAllSuccess(state, action) {
      state.notes = [...state.notes, ...action.payload.data.notes];
      state.total = action.payload.data.total;
    },
    getAllFail(state, action) {
      state.error = action.payload;
    },

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
