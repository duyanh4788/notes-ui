import { NoteDetailType } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';
import TexAreas from 'components/TexAreas';
import Editors from 'components/Editors';
import Schedules from 'components/Schedules';
import Files from 'components/Files';

interface Props {
  noteDetail: NoteDetails;
  contentId: string;
  langCode: string;
  changeContent: (detail: NoteDetails, content: string) => void;
}

export const Content = (props: Props) => {
  const { noteDetail, contentId, changeContent, langCode } = props;

  const renderContent = (detail: NoteDetails) => {
    const valContent = detail.isVitrual ? contentId : detail.content;
    if (detail.type === NoteDetailType.STRING) {
      return <TexAreas detail={detail} valContent={valContent} changeContent={changeContent} />;
    }
    if (detail.type === NoteDetailType.CODE) {
      return (
        <Editors
          detail={detail}
          valContent={valContent}
          changeContent={changeContent}
          langCode={langCode}
        />
      );
    }
    if (detail.type === NoteDetailType.SCHEDULE) {
      return (
        <Schedules noteDetails={detail} valContent={valContent} changeContent={changeContent} />
      );
    }
    if (detail.type === NoteDetailType.UPLOAD_FILE) {
      return <Files noteDetails={detail} />;
    }
  };

  return renderContent(noteDetail);
};
