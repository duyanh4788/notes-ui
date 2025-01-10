import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  IconButton,
  TextareaAutosize,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import * as NoteSelectors from 'store/noteDetails/shared/selectors';
import * as Notes from 'store/notes/shared/selectors';
import { LIMIT, NoteDetailType } from 'commom/contants';
import { AddRounded, CheckRounded, DeleteRounded, EditRounded } from '@mui/icons-material';
import { NoteDetails } from 'interface/noteDetails';
import { Helper } from 'utils/helper';
import { Textarea } from '@mui/joy';

export const NoteDetail = () => {
  const dispatch = useDispatch();
  const noteDetails = useSelector(NoteSelectors.selectNoteDetails);
  const note = useSelector(Notes.selectNote);
  const total = useSelector(NoteSelectors.selectTotal);
  const isUpdate = useSelector(NoteSelectors.selectIsUpdate);

  const [skip, setSkip] = useState<number>(0);

  const renderDetails = () => {
    if (!note) return;
    if (!noteDetails.length) return;
    return noteDetails.map(note => (
      <Grid size={12} key={note.id}>
        <Card>
          <CardActions>
            {note.isVitrual ? (
              <IconButton onClick={handleAdd}>
                <CheckRounded />
              </IconButton>
            ) : (
              <IconButton onClick={handleAdd}>
                <EditRounded />
              </IconButton>
            )}
            <IconButton size="small" onClick={deleteItem}>
              <DeleteRounded fontSize="small" />
            </IconButton>
          </CardActions>
          <CardContent>
            {note.isVitrual ? (
              <TextField
                className="trees_text_field"
                value={note.title}
                //   onChange={e => setLabel(e.target.value)}
                placeholder="Enter node name"
              />
            ) : (
              <Typography variant="h6">{note.title}</Typography>
            )}
            {note.isVitrual ? (
              <Textarea minRows={2} variant="solid" value={note.content} />
            ) : (
              <Typography variant="h6">{note.content}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const handleAdd = () => {
    if (!note) return;
    const newVitrual: NoteDetails = {
      id: Helper.randomNum(1, 10000),
      title: 'New Note',
      content: 'Content',
      noteId: note.id,
      type: NoteDetailType.STRING,
      isVitrual: true,
    };
    dispatch(NoteDetailsSlice.actions.addVitrual(newVitrual));
  };

  const deleteItem = () => {};

  return (
    <Box sx={{ textAlign: 'center' }}>
      {note && (
        <IconButton onClick={handleAdd}>
          <AddRounded />
        </IconButton>
      )}
      <Grid container spacing={2}>
        {renderDetails()}
      </Grid>
    </Box>
  );
};
