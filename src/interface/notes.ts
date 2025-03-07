import { StatusType } from 'commom/contants';
import { NoteDetails } from './noteDetails';
import { TreeViewItemReorderPosition } from '@mui/x-tree-view-pro/internals/plugins/useTreeViewItemsReordering';

export interface Notes {
  id: string;
  label: string;
  status: StatusType;
  parentId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  isEdit: boolean;
  userId: number;
  children: Notes[];
  noteDetails?: NoteDetails[];
  _count: { noteDetails: number; children: number };
}

export interface ResNotes {
  notes: Notes[];
  total: number;
}

export interface CountRes {
  totalNotes: number;
  totalNoteDetails: number;
  noteId: string;
}

export interface ParamsOrdering {
  itemId: string;
  oldPosition: TreeViewItemReorderPosition;
  newPosition: TreeViewItemReorderPosition;
}
