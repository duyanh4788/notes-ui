import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  styled,
  Paper,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import * as NoteDetailsSelectors from 'store/noteDetails/shared/selectors';
import * as Notes from 'store/notes/shared/selectors';
import {
  ACCEPT_PROPS,
  ALLOWED_TYPES,
  KeyFromData,
  LangCodes,
  LIMIT,
  LIST_NUMBERS,
  MsgToast,
  NoteDetailType,
  PageType,
  TooltipTitle,
} from 'commom/contants';
import { AddRounded, AutoAwesomeRounded, CloudUpload, ExpandCircleDown } from '@mui/icons-material';
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
  const [sizeAuto, setSizeAuto] = useState<number>(50);
  const [title, setTitle] = useState<Map<number, string>>(new Map());
  const [content, setContent] = useState<Map<number, string>>(new Map());
  const [langCode, setLangCode] = useState<string>(LangCodes[0].value);
  const [view, setView] = useState<Set<number>>(new Set());
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

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

  const handleAuto = (numberLength: number) => {
    if (!note) return;
    let counts = 0;
    Array.from({ length: numberLength }, () => {
      const newNote = Helper.fakeNoteDetails(note.id);
      dispatch(NoteDetailsSlice.actions.createdLoad(newNote));
      counts += 1;
    });
    setSkip(0);
    const params = {
      noteId: note.id,
      skip: 0 + LIMIT,
      limit: LIMIT,
    };
    toast.success(`You were created with ${counts} notes !!!`);
    dispatch(NoteDetailsSlice.actions.getAllLoad(params));
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
      toast.success(MsgToast.COPY_FILE);
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

  const handleStopDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      handleStopDrag(e);
      setIsDragOver(true);
    },
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      handleStopDrag(e);
      setIsDragOver(false);

      if (!note?.id) return;
      const file = e.dataTransfer.files[0];
      if (!file) return toast.error(MsgToast.UPLOAD_FILE);
      if (!ALLOWED_TYPES.includes(file.type)) return toast.error(MsgToast.INVALID_TYPE);

      const formData = new FormData();
      formData.append(KeyFromData.UPLOAD, file);
      formData.append(KeyFromData.NOTEID, note.id);
      dispatch(NoteDetailsSlice.actions.uploadFileLoad(formData));
    },
    onDragLeave: (e: React.DragEvent) => {
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor?.closest('.note_details, .animate_drag')) {
        return;
      }
      handleStopDrag(e);
      setIsDragOver(false);
    },
  };

  const uploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append(KeyFromData.UPLOAD, file);
    if (note?.id) formData.append(KeyFromData.NOTEID, note.id);
    dispatch(NoteDetailsSlice.actions.uploadFileLoad(formData));
  };

  return (
    <Box
      className={`note_details ${!noteDetails.length ? 'note_details_empty' : ''}`}
      {...dragEvents}
    >
      {isDragOver && <Box className="animate_drag">{MsgToast.DROP_LABEL}</Box>}
      {noteId && (
        <Box className="btn_container">
          <Box className="btn_auto">
            <Tooltip title={TooltipTitle.AUTO}>
              <FormControl size="small">
                <Select
                  onChange={e => {
                    handleAuto(Number(e.target.value));
                  }}
                  startAdornment={<AutoAwesomeRounded fontSize="small" />}
                  displayEmpty
                  notched
                >
                  {LIST_NUMBERS.map(x => (
                    <MenuItem value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Box>
          <Box className="btn_add">
            <Tooltip title={TooltipTitle.ADD}>
              <IconButton onClick={handleAddVitrual}>
                <AddRounded />
              </IconButton>
            </Tooltip>
            <Tooltip title={MsgToast.HOVER_LABEL} arrow open placement="right-start">
              <label className="btn_upload" htmlFor={note?.label}>
                <input
                  onChange={uploadChange}
                  accept={ACCEPT_PROPS}
                  id={note?.label}
                  type="file"
                  multiple
                  hidden
                />
                <CloudUpload fontSize="small" />
              </label>
            </Tooltip>
          </Box>
        </Box>
      )}
      <Grid container spacing={2}>
        {renderDetails()}
      </Grid>
      {noteDetails.length > 0 && (
        <IconButton disabled={total - skip < LIMIT} onClick={handleGetMore}>
          <ExpandCircleDown />
        </IconButton>
      )}
    </Box>
  );
};
