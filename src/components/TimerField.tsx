import Box from '@mui/material/Box';
import { TimeField } from '@mui/x-date-pickers';
import moment from 'moment';

interface Props {
  isEdit: boolean;
  scheduleTime: any;
  changeTime: (value: moment.Moment | null) => void;
}

export default function TimerField(props: Props) {
  const { isEdit, scheduleTime, changeTime } = props;

  return (
    <TimeField
      defaultValue={moment(scheduleTime)}
      format="HH:mm:ss"
      disabled={!isEdit}
      onChange={changeTime}
      color="success"
      className="flip_time"
    />
  );
}
