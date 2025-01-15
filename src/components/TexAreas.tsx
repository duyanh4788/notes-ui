import { Textarea } from '@mui/joy';
import { NoteDetails } from 'interface/noteDetails';

interface Props {
  detail: NoteDetails;
  valContent: string;
  changeContent: (detail: NoteDetails, content: string) => void;
}

export default function TexAreas(props: Props) {
  const { detail, valContent, changeContent } = props;
  return (
    <Textarea
      minRows={2}
      variant="solid"
      value={valContent}
      readOnly={!detail.isVitrual}
      onChange={e => changeContent(detail, e.target.value)}
    />
  );
}
