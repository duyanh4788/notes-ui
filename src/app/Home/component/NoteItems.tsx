import {
  TreeItem2,
  TreeItem2Props,
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
  useTreeItem2Utils,
} from '@mui/x-tree-view-pro';
import { CountRes, Notes } from 'interface/notes';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import { v4 as uuidv4 } from 'uuid';
import {
  CustomLabel,
  CustomLabelInput,
  CustomLabelInputProps,
  CustomLabelProps,
} from './CustomLabel';
import { LIMIT } from 'commom/contants';

export const NoteItems = React.forwardRef(function NoteItem(
  props: TreeItem2Props & {
    note: Notes;
    countNotes: CountRes | null;
    expanded: Set<string>;
    toggleExpand: (noteId: string) => void;
    limitDetail: Set<string>;
    toggleLimitDetail: (noteId: string) => void;
  },
  ref: React.Ref<HTMLLIElement>,
) {
  const dispatch = useDispatch();
  const { note, expanded, toggleExpand, limitDetail, toggleLimitDetail, countNotes, ...rest } =
    props;

  const { interactions, status } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children,
  });

  const doubleClick: UseTreeItem2LabelSlotOwnProps['onDoubleClick'] = event => {
    event.defaultMuiPrevented = true;
    interactions.toggleItemEditing();
  };

  const getDetails = () => {
    toggleLimitDetail(note.id);
    if (limitDetail.has(note.id)) return;
    const params = {
      noteId: note.id,
      skip: 0,
      limit: LIMIT,
    };
    dispatch(NoteSlice.actions.getByIdSuccess({ data: note }));
    dispatch(NoteDetailsSlice.actions.clearNoteDetails());
    dispatch(NoteDetailsSlice.actions.getAllLoad(params));
  };

  const inputBlur: UseTreeItem2LabelInputSlotOwnProps['onBlur'] = event => {
    event.defaultMuiPrevented = true;
  };

  const inputKeyDown: UseTreeItem2LabelInputSlotOwnProps['onKeyDown'] = event => {
    event.defaultMuiPrevented = true;
    const {
      key,
      currentTarget: { value },
    } = event;
    if (key === 'Enter') {
      if (value && value !== note.label) {
        if (!note.createdAt) {
          const { id, parentId } = note;
          dispatch(NoteSlice.actions.createdChildLoad({ parentId, label: value }));
          dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
        } else {
          dispatch(NoteSlice.actions.updatedLoad({ id: note.id, label: value }));
        }
      }
      interactions.toggleItemEditing();
    }
  };

  const editItem = () => {
    interactions.toggleItemEditing();
  };

  const saveItemEdit = (event: React.SyntheticEvent, newLabel: string) => {
    if (!newLabel) return;
    interactions.handleSaveItemLabel(event, newLabel);
    if (!note.createdAt) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.createdChildLoad({ parentId, label: newLabel }));
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    }
    if (note.createdAt) {
      dispatch(NoteSlice.actions.updatedLoad({ id: note.id, label: newLabel }));
    }
    interactions.toggleItemEditing();
  };

  const cancelItemEdit = () => {
    if (!note.createdAt) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    }
    interactions.toggleItemEditing();
  };

  const deleteItem = () => {
    if (!note.createdAt) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    } else {
      dispatch(NoteSlice.actions.deletedLoad(note.id));
      dispatch(NoteDetailsSlice.actions.clearNoteDetails());
    }
  };

  const countByUserId = (noteId: string) => {
    dispatch(NoteSlice.actions.countByUserIdLoad(noteId));
  };

  const clearCounts = () => {
    dispatch(NoteSlice.actions.clearCounts());
  };

  const addChild = (event: React.MouseEvent) => {
    if (!note.children || !note.children.length) {
      interactions.handleExpansion(event);
    }
    if (!expanded.has(note.id)) {
      toggleExpand(note.id);
    }
    const newChild = {
      id: uuidv4(),
      label: 'New Child',
      parentId: note.id,
      children: [],
      _count: { noteDetails: 0, children: 0 },
    };
    dispatch(NoteSlice.actions.addChildVitrual(newChild));
    if (note.children && note.children.length) {
      const child = note.children.find(x => !x.createdAt);
      if (child) {
        dispatch(
          NoteSlice.actions.createdChildLoad({ parentId: child.parentId, label: child.label }),
        );
        dispatch(NoteSlice.actions.delChildVitrual({ id: child.id, parentId: child.parentId }));
      }
    }
  };

  const onofExpand = (event: React.MouseEvent) => {
    if (note.parentId) {
      dispatch(NoteSlice.actions.getByIdLoad(note.id));
    }
    toggleExpand(note.id);
    if (note.children && note.children.length) {
      interactions.handleExpansion(event);
    }
  };

  return (
    <TreeItem2
      style={{ transition: 'none' }}
      {...rest}
      ref={ref}
      aria-expanded={expanded.has(note.id)}
      slots={{
        label: CustomLabel,
        labelInput: CustomLabelInput,
      }}
      slotProps={{
        label: {
          onDoubleClick: doubleClick,
          editable: status.editable,
          expanded: expanded,
          noteId: note.id,
          quantityChild: note?._count?.children || 0,
          quantityFile: note?._count?.noteDetails || 0,
          countNotes: countNotes,
          editItem: editItem,
          deleteItem: deleteItem,
          countByUserId: countByUserId,
          clearCounts: clearCounts,
          onofExpand: onofExpand,
          addChild: addChild,
          getDetails: getDetails,
        } as unknown as CustomLabelProps,
        labelInput: {
          onBlur: inputBlur,
          onKeyDown: inputKeyDown,
          cancelItemEdit: cancelItemEdit,
          saveItemEdit: saveItemEdit,
        } as unknown as CustomLabelInputProps,
      }}
    />
  );
});
