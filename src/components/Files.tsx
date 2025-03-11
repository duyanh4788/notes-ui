import { Box, Skeleton, Typography } from '@mui/material';
import { NoteDetailType, TypeApi } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';
import { useEffect, useState } from 'react';
import { configResponse, configResponseError, httpRequest } from 'services/request';
import { Api } from 'store/noteDetails/constants';

interface Props {
  noteDetails: NoteDetails;
}

export default function Files(props: Props) {
  const { noteDetails } = props;

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!noteDetails || noteDetails.type !== NoteDetailType.UPLOAD_FILE) return;
      try {
        const response = await httpRequest(TypeApi.API_NOTES).get(
          `${Api.FILE}/${noteDetails.id}?noteId=${noteDetails.noteId}`,
        );

        const { data } = configResponse(response);
        if (!data) return;
        setFileUrl(data);
      } catch (error) {
        configResponseError(error);
      }
    };

    fetchFile();
  }, [noteDetails]);

  if (!noteDetails || !fileUrl) {
    return <Skeleton variant="rectangular" />;
  }

  const extension = noteDetails.content.split('.').pop()?.toLowerCase();
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const pdfTypes = ['pdf'];
  const officeTypes = ['doc', 'docx', 'xls', 'xlsx'];

  if (extension && imageTypes.includes(extension)) {
    return <img src={fileUrl} alt="Preview" />;
  }

  if (extension && pdfTypes.includes(extension)) {
    return <iframe src={fileUrl} title="PDF Preview" />;
  }

  if (extension && officeTypes.includes(extension)) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
      ></iframe>
    );
  }

  return (
    <Box className="upload_file">
      <Typography>{noteDetails.content.split('/').pop()}</Typography>
    </Box>
  );
}
