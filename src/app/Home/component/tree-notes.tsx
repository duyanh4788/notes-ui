import { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view';
import { AddRounded, ExpandCircleDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import * as NoteSelectors from 'store/notes/shared/selectors';
import { Notes } from 'interface/notes';
import { LIMIT } from 'commom/contants';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { NoteItem } from 'components/sortableItem';

export const TreesNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(NoteSelectors.selectNotes);
  const total = useSelector(NoteSelectors.selectTotal);
  const isUpdate = useSelector(NoteSelectors.selectIsUpdate);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [nodeNotes, setNodeNotes] = useState<Notes[]>([]);
  const [newNodeName, setNewNodeName] = useState<string>('');
  const [newNodeChildName, setNewNodeChildName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [noteId, setNoteId] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [isAddingChild, setIsAddingChild] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  useEffect(() => {
    dispatch(NoteSlice.actions.getAll({ skip, limit: LIMIT }));
  }, []);

  useEffect(() => {
    function initNotes(data: Notes[]) {
      if (data && data.length === nodeNotes.length && !isUpdate) return;
      setNodeNotes(data);
      if (isUpdate) {
        dispatch(NoteSlice.actions.setIsUpdate(!isUpdate));
      }
    }
    initNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (noteId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [noteId]);

  const handleAdd = () => {
    if (!newNodeName.trim()) return;
    dispatch(NoteSlice.actions.created({ title: newNodeName }));
  };

  const handleAddChild = (parentId: number) => {
    if (!newNodeChildName.trim()) return;
    dispatch(NoteSlice.actions.createdChild({ title: newNodeChildName, parentId }));
    setNewNodeChildName('');
    setIsAddingChild(null);
  };

  const handleDelete = (noteId: number) => {
    dispatch(NoteSlice.actions.deleted(noteId));
  };

  const handleEdit = (noteId: number, title: string) => {
    setNoteId(noteId);
    setTitle(title);
  };

  const handleSave = (noteId: number) => {
    if (!title.trim()) return;
    dispatch(NoteSlice.actions.updated({ id: noteId, title }));
    setNoteId(0);
    setTitle('');
  };

  const handleGetMore = () => {
    setSkip(skip + LIMIT);
    dispatch(NoteSlice.actions.getAll({ skip: skip + LIMIT, limit: LIMIT }));
  };

  const renderNotes = (note: Notes) => {
    return (
      <NoteItem
        key={note.id}
        note={note}
        noteId={noteId}
        inputRef={inputRef}
        title={title}
        setTitle={setTitle}
        isAddingChild={isAddingChild}
        onAddChild={setIsAddingChild}
        newNodeChildName={newNodeChildName}
        setNewNodeChildName={setNewNodeChildName}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSave={handleSave}
        handleAddChild={handleAddChild}
      />
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeIndex = nodeNotes.findIndex(item => item.id === Number(active.id));
    const overIndex = nodeNotes.findIndex(item => item.id === Number(over.id));

    if (activeIndex !== overIndex) {
      const updatedNotes = arrayMove(nodeNotes, activeIndex, overIndex);
      setNodeNotes(updatedNotes);
    }
  };

  return (
    <Box className="trees_box">
      <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
        <TextField
          className="trees_text_field"
          value={newNodeName}
          onChange={e => setNewNodeName(e.target.value)}
          placeholder="Enter node name"
        />
        <IconButton onClick={handleAdd}>
          <AddRounded />
        </IconButton>
      </Box>
      {nodeNotes.length ? (
        <DndContext
          sensors={sensors}
          onDragStart={event => console.log('Dragging started', event)}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={nodeNotes.map(note => note.id.toString())}>
            <SimpleTreeView>{nodeNotes.map(renderNotes)}</SimpleTreeView>
          </SortableContext>
        </DndContext>
      ) : null}

      <Box sx={{ textAlign: 'center' }} hidden={!notes.length}>
        <IconButton disabled={!notes.length || total - skip < 10} onClick={handleGetMore}>
          <ExpandCircleDown />
        </IconButton>
      </Box>
    </Box>
  );
};
