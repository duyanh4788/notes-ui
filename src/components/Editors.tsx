import Editor from '@monaco-editor/react';
import { NoteDetails } from 'interface/noteDetails';

interface Props {
  detail: NoteDetails;
  valContent: string;
  langCode: string;
  changeContent: (detail: NoteDetails, content: string) => void;
}

export default function Editors(props: Props) {
  const { detail, valContent, changeContent, langCode } = props;

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage={langCode}
      defaultValue={valContent}
      options={{
        readOnly: !detail.isVitrual,
        minimap: { enabled: false },
      }}
      onChange={(value, _) => {
        if (!detail.isVitrual) return;
        if (!value) return;
        if (value) {
          changeContent(detail, value);
        }
      }}
    />
  );
}
