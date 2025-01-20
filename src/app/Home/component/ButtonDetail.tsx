import { NoteDetailType, PageType, TooltipTitle } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';
import {
  CheckRounded,
  ContentCopy,
  DeleteRounded,
  EditRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Tooltip } from '@mui/material';
import { MenuTypes } from 'components/MenuTypes';
import { MenuLangs } from 'components/MenuLangs';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  noteDetail: NoteDetails;
  title: Map<number, string>;
  setTitle: Dispatch<SetStateAction<Map<number, string>>>;
  langCode: string;
  setLangCode: Dispatch<SetStateAction<string>>;
  mapStringById: (
    id: number,
    title: string,
    setState: Dispatch<SetStateAction<Map<number, string>>>,
  ) => void;
  toggleModlContent: (detailId: number) => void;
  handleUpdateType: (detail: NoteDetails) => void;
  handleAdd: (detail: NoteDetails) => void;
  handleUpdate: (detail: NoteDetails) => void;
  handleDelete: (detail: NoteDetails) => void;
  handleCopy: (detail: NoteDetails) => void;
  pageType: PageType;
}

export const ButtonDetail = (props: Props) => {
  const {
    noteDetail,
    title,
    setTitle,
    langCode,
    setLangCode,
    mapStringById,
    toggleModlContent,
    handleUpdateType,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleCopy,
    pageType,
  } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {noteDetail.isVitrual && pageType === PageType.MAIN ? (
        <TextField
          className="trees_text_field"
          value={title.get(noteDetail.id)}
          onChange={e => {
            if (!noteDetail.isVitrual) return;
            mapStringById(noteDetail.id, e.target.value, setTitle);
          }}
          placeholder="Enter node name"
        />
      ) : (
        <Box>
          <Chip label={noteDetail.title} />
          {pageType === PageType.MAIN && (
            <Tooltip title={TooltipTitle.VIEW}>
              <IconButton onClick={() => toggleModlContent(noteDetail.id)}>
                <VisibilityRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {noteDetail.isVitrual ? (
          <Tooltip title={TooltipTitle.SAVE}>
            <IconButton onClick={() => handleAdd(noteDetail)}>
              <CheckRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={TooltipTitle.EDT}>
            <IconButton onClick={() => handleUpdate(noteDetail)}>
              <EditRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {pageType === PageType.MAIN && (
          <Tooltip title={TooltipTitle.DEL}>
            <IconButton onClick={() => handleDelete(noteDetail)}>
              <DeleteRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {pageType === PageType.MAIN && (
          <MenuTypes noteDetails={noteDetail} getType={handleUpdateType} />
        )}
        {noteDetail.type === NoteDetailType.CODE && (
          <MenuLangs langCode={langCode} setLangCode={setLangCode} />
        )}
        <Tooltip title={TooltipTitle.COPY}>
          <IconButton onClick={() => handleCopy(noteDetail)}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
