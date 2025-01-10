import { useState, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { AddRounded, ExpandCircleDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import * as NoteSelectors from 'store/notes/shared/selectors';
import { Notes } from 'interface/notes';
import { LIMIT } from 'commom/contants';
import { RichTreeView, TreeItem2Props, useTreeItem2Utils } from '@mui/x-tree-view';
import { NoteItems } from 'app/Home/component/NoteItems';
import Grid from '@mui/material/Grid2';
import { NoteDetail } from './NoteDetail';

export const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(NoteSelectors.selectNotes);
  const total = useSelector(NoteSelectors.selectTotal);
  const isUpdate = useSelector(NoteSelectors.selectIsUpdate);

  const [notesList, setNoteLists] = useState<Notes[]>([]);
  const [label, setLabel] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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

  const toggleExpand = (noteId: string) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  const NoteItem = (props: TreeItem2Props) => {
    const { publicAPI } = useTreeItem2Utils({
      itemId: props.itemId,
      children: props.children,
    });

    const note: Notes = publicAPI.getItem(props.itemId);
    useEffect(() => {
      if (expanded.has(note.id) && note?.children?.length) {
        const event = {} as React.SyntheticEvent;
        publicAPI.setItemExpansion(event, props.itemId, true);
      }
    }, [expanded, note?.children?.length, props.itemId]);
    return <NoteItems {...props} note={note} expanded={expanded} toggleExpand={toggleExpand} />;
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
      <Grid container spacing={1}>
        <Grid size={5} className="tree_gird">
          {notesList.length ? (
            <RichTreeView
              sx={{ height: 'fit-content', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              items={notesList}
              isItemEditable
              experimentalFeatures={{
                indentationAtItemLevel: true,
                labelEditing: true,
              }}
              defaultExpandedItems={['grild']}
              slots={{
                item: (props: TreeItem2Props) => <NoteItem {...props} />,
              }}
            />
          ) : null}
          <IconButton disabled={!notes.length || total - skip < LIMIT} onClick={handleGetMore}>
            <ExpandCircleDown />
          </IconButton>
        </Grid>
        <Grid size={7} className="tree_gird">
          <NoteDetail />
        </Grid>
      </Grid>
    </Box>
  );
};
