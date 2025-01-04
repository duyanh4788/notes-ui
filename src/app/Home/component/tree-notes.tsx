import { useState, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { AddRounded, ExpandCircleDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import * as NoteSelectors from 'store/notes/shared/selectors';
import { Notes } from 'interface/notes';
import { LIMIT } from 'commom/contants';
/* eslint-disable react-hooks/rules-of-hooks */
import { RichTreeView, TreeItem2Props, useTreeItem2Utils } from '@mui/x-tree-view';
import { NoteItem } from 'components/note-items';

export const TreesNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(NoteSelectors.selectNotes);
  const total = useSelector(NoteSelectors.selectTotal);
  const isUpdate = useSelector(NoteSelectors.selectIsUpdate);

  const [notesList, setNoteLists] = useState<Notes[]>([]);
  const [label, setLabel] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const [labelValue, setLabelValue] = useState<string | null>(null);

  useEffect(() => {
    dispatch(NoteSlice.actions.getAll({ skip, limit: LIMIT }));
  }, []);

  useEffect(() => {
    function initNotes(data: Notes[]) {
      if (data && data.length === notesList.length && !isUpdate) return;
      setNoteLists(data);
      if (isUpdate) {
        dispatch(NoteSlice.actions.setIsUpdate(!isUpdate));
      }
    }
    initNotes(notes);
  }, [notes]);

  const handleAdd = () => {
    if (!label.trim()) return;
    dispatch(NoteSlice.actions.created({ label }));
    setLabel('');
  };

  const handleGetMore = () => {
    setSkip(skip + LIMIT);
    dispatch(NoteSlice.actions.getAll({ skip: skip + LIMIT, limit: LIMIT }));
  };

  return (
    <Box className="trees_box">
      <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
        <TextField
          className="trees_text_field"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Enter node name"
        />
        <IconButton onClick={handleAdd}>
          <AddRounded />
        </IconButton>
      </Box>
      {notesList.length ? (
        <RichTreeView
          items={notesList}
          experimentalFeatures={{ labelEditing: true }}
          isItemEditable
          defaultExpandedItems={[]}
          slots={{
            item: (props: TreeItem2Props) => {
              const { publicAPI } = useTreeItem2Utils({
                itemId: props.itemId,
                children: props.children,
              });
              const note: Notes = publicAPI.getItem(props.itemId);
              return (
                <NoteItem
                  {...props}
                  note={note}
                  labelValue={labelValue}
                  setLabelValue={setLabelValue}
                />
              );
            },
          }}
        />
      ) : null}

      <Box sx={{ textAlign: 'center' }} hidden={!notes.length}>
        <IconButton disabled={!notes.length || total - skip < LIMIT} onClick={handleGetMore}>
          <ExpandCircleDown />
        </IconButton>
      </Box>
    </Box>
  );
};
