import { FileUploadRounded, DescriptionRounded, TableChartRounded } from '@mui/icons-material';
import { Box, Skeleton, Typography } from '@mui/material';

interface Props {
  noteDetails: { content: string };
}

export default function Files(props: Props) {
  const { noteDetails } = props;

  if (!noteDetails.content || typeof noteDetails.content !== 'string') {
    return <Skeleton variant="rectangular" />;
  }

  const extension = noteDetails.content.split('.').pop()?.toLowerCase();
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const pdfTypes = ['pdf'];
  const officeTypes = ['doc', 'docx', 'xls', 'xlsx'];

  if (extension && imageTypes.includes(extension)) {
    return <img src={noteDetails.content} alt="Preview" />;
  }

  if (extension && pdfTypes.includes(extension)) {
    return <iframe src={noteDetails.content} title="PDF Preview" />;
  }

  if (extension && officeTypes.includes(extension)) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(noteDetails.content)}`}
      ></iframe>
    );
  }

  return (
    <Box className="upload_file">
      <Typography>{noteDetails.content.split('/').pop()}</Typography>
    </Box>
  );
}
