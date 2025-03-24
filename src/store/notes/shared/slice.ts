import { createSlice } from '@reduxjs/toolkit';
import { CountRes, Notes } from 'interface/notes';

interface NotesState {
  note: Notes | null;
  notes: Notes[];
  total: number;
  isUpdate: boolean;
  isLoad: boolean;
  error: string | null;
  counts: CountRes | null;
}

const initialState: NotesState = {
  note: null,
  counts: null,
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
    createdSuccess() {},
    createdFail(state, action) {
      state.error = action.payload;
    },

    createdChildLoad(_, __) {},
    createdChildSuccess() {},
    createdChildFail(state, action) {
      state.error = action.payload;
    },

    updatedLoad(_, __) {},
    updatedSuccess() {},
    updatedFail(state, action) {
      state.error = action.payload;
    },

    updatedOrderRingLoad(_, __) {},
    updatedOrderRingSuccess() {},
    updatedOrderRingFail(state, action) {
      state.error = action.payload;
    },

    deletedLoad(_, __) {},
    deletedSuccess() {},
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

    countByUserIdLoad: (state, __) => {
      state.counts = null;
    },
    countByUserIdSuccess: (state, action) => {
      state.counts = action.payload.data;
    },
    countByUserIdFail: (state, action) => {
      state.error = action.payload;
    },
    clearCounts: state => {
      state.counts = null;
    },
    clearNote: state => {
      state.note = null;
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
