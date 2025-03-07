import { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { AddRounded, ExpandCircleDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteSlice from 'store/notes/shared/slice';
import * as NoteSelectors from 'store/notes/shared/selectors';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import { Notes, ParamsOrdering } from 'interface/notes';
import { LIMIT, TooltipTitle } from 'commom/contants';
import { TreeItem2Props, useTreeItem2Utils } from '@mui/x-tree-view';
import { NoteItems } from 'app/Home/component/NoteItems';
import Grid from '@mui/material/Grid2';
import { NoteDetail } from './NoteDetail';
import { Search } from 'components/Search';
import { RichTreeViewPro } from '@mui/x-tree-view-pro/RichTreeViewPro';
import { Helper } from 'utils/helper';

export const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(NoteSelectors.selectNotes);
  const countNotes = useSelector(NoteSelectors.selectCounts);
  const total = useSelector(NoteSelectors.selectTotal);
  const isUpdate = useSelector(NoteSelectors.selectIsUpdate);

  const [notesList, setNoteLists] = useState<Notes[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [limitDetail, setLimitDetail] = useState<Set<string>>(new Set());
  const [textSearch, setTextSearch] = useState<string | null>('');

  useEffect(() => {
    dispatch(NoteSlice.actions.getAllLoad({ skip, limit: LIMIT }));
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

  useEffect(() => {
    if (textSearch === '') return;
    if (textSearch === null) {
      if (notes[0]?.id) {
        const params = {
          noteId: notes[0].id,
          skip: 0,
          limit: LIMIT,
        };
        dispatch(NoteDetailsSlice.actions.getAllLoad(params));
        setTextSearch('');
      }
      return;
    }
    const timeoutId = setTimeout(() => {
      dispatch(NoteDetailsSlice.actions.searchLoad(textSearch));
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [textSearch, dispatch]);

  const handleAdd = () => {
    dispatch(NoteSlice.actions.createdLoad({ label: 'New Floder' }));
  };

  const handleGetMore = () => {
    setSkip(skip + LIMIT);
    dispatch(NoteSlice.actions.getAllLoad({ skip: skip + LIMIT, limit: LIMIT }));
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

  const toggleLimitDetail = (noteId: string) => {
    if (limitDetail.has(noteId)) return;
    setLimitDetail(new Set([noteId]));
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
    return (
      <NoteItems
        {...props}
        note={note}
        countNotes={countNotes}
        expanded={expanded}
        toggleExpand={toggleExpand}
        limitDetail={limitDetail}
        toggleLimitDetail={toggleLimitDetail}
      />
    );
  };

  const handleOrderRing = (params: ParamsOrdering) => {
    const note = Helper.deepFind(notesList, params.itemId);
    if (!note) return;
    dispatch(NoteSlice.actions.updatedLoad({ id: note.id, parentId: params.newPosition.parentId }));
  };

  return (
    <Box className="trees_box">
      <Search textSearch={textSearch} setTextSearch={setTextSearch} />
      <Grid container spacing={1}>
        {!textSearch ? (
          <Grid size={5} className="tree_gird">
            <Tooltip title={TooltipTitle.ADD}>
              <IconButton onClick={handleAdd}>
                <AddRounded />
              </IconButton>
            </Tooltip>
            {notesList.length ? (
              // <RichTreeView
              //   sx={{ height: 'fit-content', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              //   items={notesList}
              //   isItemEditable
              //   experimentalFeatures={{
              //     indentationAtItemLevel: true,
              //     labelEditing: true,
              //   }}
              //   defaultExpandedItems={['grild']}
              //   slots={{
              //     item: (props: TreeItem2Props) => <NoteItem {...props} />,
              //   }}
              // />
              <RichTreeViewPro
                sx={{ height: 'fit-content', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                items={notesList}
                itemsReordering
                isItemEditable
                defaultExpandedItems={['grid', 'pickers']}
                experimentalFeatures={{
                  indentationAtItemLevel: true,
                  labelEditing: true,
                  itemsReordering: true,
                }}
                slots={{
                  item: (props: TreeItem2Props) => <NoteItem {...props} />,
                }}
                onItemPositionChange={params => handleOrderRing(params)}
              />
            ) : null}
            <IconButton disabled={!notes.length || total - skip <= LIMIT} onClick={handleGetMore}>
              <ExpandCircleDown />
            </IconButton>
          </Grid>
        ) : null}
        <Grid size={!textSearch ? 7 : 12} className="tree_gird">
          <NoteDetail />
        </Grid>
      </Grid>
    </Box>
  );
};
