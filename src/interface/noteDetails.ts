import { NoteDetailType, StatusType } from 'commom/contants';
import { Paging } from './paging';

export type NoteDetails = {
  id: number;
  noteId: string;
  title: string;
  content: string;
  type: NoteDetailType;
  status?: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
  sorting?: number;
  scheduleTime?: Date;
  isVitrual?: boolean;
};

export interface ResNoteDetails {
  noteDetails: NoteDetails[];
  total: number;
}

export interface ParamsNoteDetails {
  id: number;
  noteId: string;
}

export interface CNoteDetails {
  content: string;
  scheduleTime?: Date;
  noteId: string;
}

export interface UNoteDetails {
  id: number;
  content: string;
  scheduleTime?: Date;
  noteId: string;
  status: StatusType;
  type: NoteDetailType;
}

export interface GetNoteDetails extends Paging {
  noteId: string;
}
