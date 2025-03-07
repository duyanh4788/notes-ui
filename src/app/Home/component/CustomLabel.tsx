import {
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
  TreeItem2Label,
  TreeItem2LabelInput,
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
import { Box, Divider, IconButton, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { TooltipTitle } from 'commom/contants';
import { CountRes } from 'interface/notes';

export interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  expanded: Set<string>;
  noteId: string;
  quantityChild: number;
  quantityFile: number;
  countNotes: CountRes;
  editItem: () => void;
  deleteItem: () => void;
  countByUserId: (noteId: string) => void;
  clearCounts: () => void;
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
  countNotes,
  quantityChild,
  quantityFile,
  editItem,
  deleteItem,
  countByUserId,
  clearCounts,
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
        <Tooltip arrow placement="right-end" title={`📁: ${quantityChild} | 📝: ${quantityFile}`}>
          <Box>{children}</Box>
        </Tooltip>
      </Box>
      {editable && (
        <Box>
          <Tooltip title={TooltipTitle.EDT}>
            <IconButton size="small" onClick={editItem}>
              <EditRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              countNotes && Object.keys(countNotes).length && noteId === countNotes.noteId ? (
                <Paper className="popover_page">
                  <Box>
                    You'll delete 📁: {countNotes?.totalNotes || 0} and 📝:{' '}
                    {countNotes?.totalNoteDetails || 0}
                  </Box>
                  <Divider />
                  <Box className="popover_box">
                    <label>Are you sure: </label>
                    <span onClick={() => clearCounts()}> ⛔ </span>
                    <span onClick={deleteItem}> 👌</span>
                  </Box>
                </Paper>
              ) : (
                TooltipTitle.DEL
              )
            }
            placement="right-start"
            arrow
            onClose={() => clearCounts()}
            open={
              countNotes && Object.keys(countNotes).length && noteId === countNotes.noteId
                ? true
                : false
            }
          >
            <IconButton size="small" onClick={() => countByUserId(noteId)}>
              <DeleteRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={TooltipTitle.ADD}>
            <IconButton size="small" onClick={addChild}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Tooltip>
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
