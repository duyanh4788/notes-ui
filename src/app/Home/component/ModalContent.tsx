import { Box, Modal } from '@mui/material';
import { Content } from './Content';
import { NoteDetails } from 'interface/noteDetails';
import { ButtonDetail } from './ButtonDetail';
import { Dispatch, SetStateAction } from 'react';
import { PageType } from 'commom/contants';

interface Props {
  handleClose: (detailId: number) => void;
  noteDetail: NoteDetails;
  contentId: string;
  langCode: string;
  setLangCode: Dispatch<SetStateAction<string>>;
  changeContent: (detail: NoteDetails, content: string) => void;
  title: Map<number, string>;
  setTitle: Dispatch<SetStateAction<Map<number, string>>>;
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

export const ModalContent = (props: Props) => {
  const {
    handleClose,
    noteDetail,
    contentId,
    changeContent,
    langCode,
    setLangCode,
    title,
    setTitle,
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
    <Modal
      open={true}
      onClose={() => handleClose(noteDetail.id)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="box_content">
        <ButtonDetail
          noteDetail={noteDetail}
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
          pageType={pageType}
        />
        <Content
          noteDetail={noteDetail}
          contentId={contentId}
          langCode={langCode}
          changeContent={changeContent}
        />
      </Box>
    </Modal>
  );
};
