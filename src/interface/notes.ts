import { StatusType } from 'commom/contants';

export interface Notes {
  id: number;
  label: string;
  itemId: string;
  status: StatusType;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  children: Notes[];
  noteDetails?: NoteDetails[];
}

export type NoteDetails = {
  id: number;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  scheduleTime: Date;
  noteId: number;
};

export interface ResNotes {
  notes: Notes[];
  total: number;
}

export interface ParamsGetNotes {
  skip: number;
  limit: number;
}
