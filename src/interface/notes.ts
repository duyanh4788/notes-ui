import { StatusType } from 'commom/contants';
import { NoteDetails } from './noteDetails';

export interface Notes {
  id: string;
  label: string;
  status: StatusType;
  parentId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  children: Notes[];
  noteDetails?: NoteDetails[];
}

export interface ResNotes {
  notes: Notes[];
  total: number;
}
