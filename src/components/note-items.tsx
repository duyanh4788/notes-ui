import {
  AddRounded,
  CheckRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  SaveRounded,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import {
  TreeItem2,
  TreeItem2Label,
  TreeItem2LabelInput,
  TreeItem2Props,
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
  useTreeItem2,
  useTreeItem2Utils,
} from '@mui/x-tree-view';
import { Notes } from 'interface/notes';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import { Helper } from 'utils/helper';

interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  editing: boolean;
  editItem: () => void;
  deleteItem: () => void;
  getById: () => void;
  addChild: (event: React.MouseEvent) => void;
}

function CustomLabel({
  editing,
  editable,
  children,
  editItem,
  deleteItem,
  getById,
  addChild,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      editable={editable}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box onClick={getById}>{children}</Box>
      {editable && (
        <Box>
          <IconButton size="small" onClick={editItem} sx={{ color: 'text.secondary' }}>
            <EditRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={deleteItem}>
            <DeleteRounded fontSize="small" />
          </IconButton>
          <IconButton className="iconContainer" size="small" onClick={addChild}>
            <AddRounded fontSize="small" />
          </IconButton>
        </Box>
      )}
    </TreeItem2Label>
  );
}

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  cancelItemEdit: (event: React.SyntheticEvent) => void;
  saveItemEdit: (event: React.SyntheticEvent, label: string) => void;
  value: string;
}

function CustomLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
  const { cancelItemEdit, saveItemEdit, value, ...other } = props;
  return (
    <React.Fragment>
      <TreeItem2LabelInput {...other} value={value} />
      <IconButton
        color="success"
        size="small"
        onClick={(event: React.MouseEvent) => {
          saveItemEdit(event, value);
        }}
      >
        <CheckRounded fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={cancelItemEdit}>
        <CloseRounded fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
}

export const NoteItem = React.forwardRef(function NoteItem(
  props: TreeItem2Props & {
    note: Notes;
    labelValue: string | null;
    setLabelValue: React.Dispatch<React.SetStateAction<string | null>>;
  },
  ref: React.Ref<HTMLLIElement>,
) {
  const dispatch = useDispatch();
  const { labelValue, setLabelValue, note, ...rest } = props;

  const { interactions, status } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children,
  });

  const handleContentDoubleClick: UseTreeItem2LabelSlotOwnProps['onDoubleClick'] = event => {
    event.defaultMuiPrevented = true;
    interactions.toggleItemEditing();
  };

  const handleInputBlur: UseTreeItem2LabelInputSlotOwnProps['onBlur'] = event => {
    event.defaultMuiPrevented = true;
  };

  const handleInputKeyDown: UseTreeItem2LabelInputSlotOwnProps['onKeyDown'] = event => {
    event.defaultMuiPrevented = true;
    const {
      key,
      currentTarget: { value },
    } = event;
    if (key === 'Enter') {
      if (value && value !== note.label) {
        if (!note.itemId) {
          const { id, parentId } = note;
          dispatch(NoteSlice.actions.createdChild({ parentId, label: value }));
          dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
        } else {
          dispatch(NoteSlice.actions.updated({ id: note.id, label: value }));
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
    if (!note.itemId) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.createdChild({ parentId, label: newLabel }));
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    }
    if (note.itemId) {
      dispatch(NoteSlice.actions.updated({ id: note.id, label: newLabel }));
    }
    setLabelValue(newLabel);
    interactions.toggleItemEditing();
  };

  const cancelItemEdit = () => {
    if (!note.itemId) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    }
    interactions.toggleItemEditing();
  };

  const deleteItem = () => {
    if (!note.itemId) {
      const { id, parentId } = note;
      dispatch(NoteSlice.actions.delChildVitrual({ id, parentId }));
    } else {
      dispatch(NoteSlice.actions.deleted(note.id));
    }
  };

  const addChild = (event: React.MouseEvent) => {
    if (!note.children || !note.children.length) {
      interactions.handleExpansion(event);
    }
    const newChild = {
      id: Helper.randomNum(1, 1000),
      label: 'New Child',
      parentId: note.id,
      children: [],
    };
    dispatch(NoteSlice.actions.addChildVitrual(newChild));
  };

  const getById = () => {
    if (note.parentId) {
      dispatch(NoteSlice.actions.getById(note.id));
    }
  };

  return (
    <TreeItem2
      {...rest}
      ref={ref}
      slots={{ label: CustomLabel, labelInput: CustomLabelInput }}
      slotProps={{
        label: {
          onDoubleClick: handleContentDoubleClick,
          editable: status.editable,
          editing: status.editing,
          editItem: editItem,
          deleteItem: deleteItem,
          getById: getById,
          addChild: addChild,
        } as unknown as CustomLabelProps,
        labelInput: {
          onBlur: handleInputBlur,
          onKeyDown: handleInputKeyDown,
          cancelItemEdit: cancelItemEdit,
          saveItemEdit: saveItemEdit,
        } as unknown as CustomLabelInputProps,
      }}
    />
  );
});
