import { MsgToast, NoteDetailType, PageType, TooltipTitle } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';
import {
  CheckRounded,
  ContentCopy,
  DeleteRounded,
  DownloadRounded,
  EditRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import { Box, Chip, IconButton, Paper, TextField, Tooltip } from '@mui/material';
import { MenuTypes } from 'components/MenuTypes';
import { MenuLangs } from 'components/MenuLangs';
import { Dispatch, SetStateAction } from 'react';
import { Helper } from 'utils/helper';
import { toast } from 'react-toastify';

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

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url, { mode: 'no-cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(MsgToast.DOWN_FILE);
    }
  };

  if (noteDetail.type === NoteDetailType.UPLOAD_FILE) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={noteDetail.title}>
            <Chip label={Helper.truncateString(noteDetail.title, 40)} />
          </Tooltip>
          <Tooltip title={TooltipTitle.VIEW}>
            <IconButton onClick={() => toggleModlContent(noteDetail.id)}>
              <VisibilityRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title={TooltipTitle.DOWNLOAD}>
            <IconButton onClick={() => handleDownload(noteDetail.content, noteDetail.title)}>
              <DownloadRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={TooltipTitle.DEL}>
            <IconButton onClick={() => handleDelete(noteDetail)}>
              <DeleteRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {noteDetail.isVitrual && pageType === PageType.MAIN ? (
        <Paper className="paper_text_field">
          <TextField
            value={title.get(noteDetail.id)}
            onChange={e => {
              if (!noteDetail.isVitrual) return;
              if (e.target.value.length >= 99) return;
              mapStringById(noteDetail.id, e.target.value, setTitle);
            }}
            placeholder="Enter node name"
            sx={{ width: '100%' }}
          />
        </Paper>
      ) : (
        <Box>
          <Tooltip title={noteDetail.title}>
            <Chip label={Helper.truncateString(noteDetail.title, 40)} />
          </Tooltip>
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
