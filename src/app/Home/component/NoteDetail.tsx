import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, IconButton, styled, Paper, Tooltip, Badge, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import * as NoteDetailsSelectors from 'store/noteDetails/shared/selectors';
import * as Notes from 'store/notes/shared/selectors';
import { LangCodes, LIMIT, NoteDetailType, PageType, TooltipTitle } from 'commom/contants';
import { AddRounded, ExpandCircleDown } from '@mui/icons-material';
import { NoteDetails } from 'interface/noteDetails';
import { Helper } from 'utils/helper';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { Content } from 'app/Home/component/Content';
import { ModalContent } from './ModalContent';
import { ButtonDetail } from './ButtonDetail';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export const NoteDetail = () => {
  const dispatch = useDispatch();
  const noteDetails = useSelector(NoteDetailsSelectors.selectNoteDetails);
  const noteId = useSelector(NoteDetailsSelectors.selectNoteId);
  const total = useSelector(NoteDetailsSelectors.selectTotal);
  const note = useSelector(Notes.selectNote);

  const [skip, setSkip] = useState<number>(0);
  const [title, setTitle] = useState<Map<number, string>>(new Map());
  const [content, setContent] = useState<Map<number, string>>(new Map());
  const [langCode, setLangCode] = useState<string>(LangCodes[0].value);
  const [view, setView] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSkip(0);
  }, [noteId]);

  const handleAddVitrual = () => {
    if (!note) return;
    const newVitrual: NoteDetails = {
      id: Helper.randomNum(1, 10000),
      title: 'New Note',
      content: 'Content',
      noteId: note.id,
      type: NoteDetailType.CODE,
      idVitrual: uuidv4(),
      isVitrual: true,
    };
    dispatch(NoteDetailsSlice.actions.addVitrual(newVitrual));
    mapStringById(newVitrual.id, newVitrual.title, setTitle);
    mapStringById(newVitrual.id, newVitrual.content, setContent);
  };

  const mapStringById = (
    id: number,
    title: string,
    setState: Dispatch<SetStateAction<Map<number, string>>>,
  ) => {
    setState(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(id, title);
      return newMap;
    });
  };

  const handleAdd = (detail: NoteDetails) => {
    // eslint-disable-next-line
    const { id, isVitrual, idVitrual, ...restDetail } = detail;
    restDetail.title = title.get(id) || 'New Note';
    restDetail.content = content.get(id) || 'Content';
    if (idVitrual) {
      dispatch(NoteDetailsSlice.actions.createdLoad(restDetail));
      dispatch(NoteDetailsSlice.actions.delVitrual(detail));
    } else {
      dispatch(NoteDetailsSlice.actions.updatedLoad({ id, ...restDetail }));
    }
  };

  const handleDelete = (detail: NoteDetails) => {
    if (detail.isVitrual) {
      dispatch(NoteDetailsSlice.actions.delVitrual(detail));
    } else {
      dispatch(NoteDetailsSlice.actions.deletedLoad(detail));
    }
  };

  const handleUpdate = (detail: NoteDetails) => {
    const newDetail = { ...detail };
    newDetail.isVitrual = true;
    dispatch(NoteDetailsSlice.actions.updateVitrual(newDetail));
    mapStringById(newDetail.id, newDetail.title, setTitle);
    mapStringById(newDetail.id, newDetail.content, setContent);
  };

  const handleCopy = (detail: NoteDetails) => {
    const textToCopy = detail.isVitrual ? content.get(detail.id) : detail.content;

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      toast.success('Copied to clipboard!');
    }
  };

  const handleUpdateType = (detail: NoteDetails) => {
    if (detail.isVitrual) {
      if (detail.type === NoteDetailType.SCHEDULE && !detail.scheduleTime) {
        detail.scheduleTime = Helper.newDateToString();
      }
      dispatch(NoteDetailsSlice.actions.updateVitrual(detail));
    } else {
      dispatch(NoteDetailsSlice.actions.updatedLoad(detail));
    }
  };

  const changeContent = (detail: NoteDetails, content: string) => {
    if (!detail.isVitrual) return;
    mapStringById(detail.id, content, setContent);
  };

  const handleGetMore = () => {
    if (!note) return;
    setSkip(skip + LIMIT);
    const params = {
      noteId: note.id,
      skip: skip + LIMIT,
      limit: LIMIT,
    };
    dispatch(NoteDetailsSlice.actions.getAllLoad(params));
  };

  const toggleModlContent = (detailId: number) => {
    setView(prev => {
      const newSet = new Set(prev);
      if (newSet.has(detailId)) {
        newSet.delete(detailId);
      } else {
        newSet.add(detailId);
      }
      return newSet;
    });
  };

  const renderDetails = () => {
    if (!noteDetails.length) return;
    return noteDetails.map(detail => (
      <Grid size={12} key={detail.id}>
        <Item className="item_detail">
          <ButtonDetail
            noteDetail={detail}
            title={title}
            setTitle={setTitle}
            langCode={langCode}
            setLangCode={setLangCode}
            mapStringById={mapStringById}
            toggleModlContent={toggleModlContent}
            handleUpdateType={handleUpdateType}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
            pageType={PageType.MAIN}
          />
          <Content
            noteDetail={detail}
            contentId={content.get(detail.id) || ''}
            langCode={langCode}
            changeContent={changeContent}
          />
          {view.has(detail.id) && (
            <ModalContent
              handleClose={toggleModlContent}
              noteDetail={detail}
              contentId={content.get(detail.id) || ''}
              langCode={langCode}
              setLangCode={setLangCode}
              changeContent={changeContent}
              title={title}
              setTitle={setTitle}
              mapStringById={mapStringById}
              toggleModlContent={toggleModlContent}
              handleUpdateType={handleUpdateType}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleCopy={handleCopy}
              pageType={PageType.MODAL}
            />
          )}
        </Item>
      </Grid>
    ));
  };

  return (
    <Box className={`note_details ${!noteDetails.length ? `note_details_empty` : ''}`}>
      {note && (
        <Tooltip title={TooltipTitle.ADD}>
          <IconButton onClick={handleAddVitrual}>
            <AddRounded />
          </IconButton>
        </Tooltip>
      )}
      <Grid container spacing={2}>
        {renderDetails()}
      </Grid>
      {noteDetails.length ? (
        <IconButton disabled={total - skip <= LIMIT} onClick={handleGetMore}>
          <ExpandCircleDown />
        </IconButton>
      ) : null}
    </Box>
  );
};
