import {
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
} from '@mui/x-tree-view';
import {
  AddRounded,
  CheckRounded,
  ChevronRightRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  ExpandMoreRounded,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { TreeItem2Label, TreeItem2LabelInput } from '@mui/x-tree-view';
import React from 'react';

export interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  expanded: Set<string>;
  noteId: string;
  quantityChild: number;
  editItem: () => void;
  deleteItem: () => void;
  onofExpand: (event: React.MouseEvent) => void;
  addChild: (event: React.MouseEvent) => void;
  getDetails: (event: React.MouseEvent) => void;
}

export interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  cancelItemEdit: (event: React.SyntheticEvent) => void;
  saveItemEdit: (event: React.SyntheticEvent, label: string) => void;
  value: string;
}

export function CustomLabel({
  editable,
  expanded,
  noteId,
  quantityChild,
  editItem,
  deleteItem,
  onofExpand,
  addChild,
  getDetails,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      onClick={getDetails}
      className="tree_items"
      {...other}
      editable={editable}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {expanded.has(noteId) && quantityChild ? (
          <IconButton size="small" onClick={onofExpand}>
            <ExpandMoreRounded fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={onofExpand}>
            <ChevronRightRounded fontSize="small" />
          </IconButton>
        )}
        {children}
      </Box>
      {editable && (
        <Box>
          <IconButton size="small" onClick={editItem}>
            <EditRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={deleteItem}>
            <DeleteRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={addChild}>
            <AddRounded fontSize="small" />
          </IconButton>
        </Box>
      )}
    </TreeItem2Label>
  );
}

export function CustomLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
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
