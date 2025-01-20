import { Textarea } from '@mui/joy';
import { NoteDetails } from 'interface/noteDetails';
import { Box, Chip, IconButton, Menu, Tooltip } from '@mui/material';
import { Moment } from 'moment';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';
import { CancelRounded, CheckRounded, EditRounded, ScheduleRounded } from '@mui/icons-material';
import { Helper } from 'utils/helper';
import React, { useEffect, useState } from 'react';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import FlipTimer from './FlipTimer';
import { TimerType, TooltipTitle } from 'commom/contants';
import { useDispatch } from 'react-redux';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

interface Props {
  noteDetails: NoteDetails;
  valContent: string;
  changeContent: (noteDetails: NoteDetails, content: string) => void;
}

export default function Schedules(props: Props) {
  const { noteDetails, valContent, changeContent } = props;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(moment(noteDetails.scheduleTime));
  const [flipTime, setFlipTime] = useState({
    [TimerType.HOUR]: moment(noteDetails.scheduleTime).hour(),
    [TimerType.MINUTE]: moment(noteDetails.scheduleTime).minute(),
    [TimerType.SECOND]: moment(noteDetails.scheduleTime).hour(),
  });

  useEffect(() => {
    if (noteDetails.scheduleTime) {
      const newTime = moment(noteDetails.scheduleTime);
      setFlipTime({
        [TimerType.HOUR]: newTime.hour(),
        [TimerType.MINUTE]: newTime.minute(),
        [TimerType.SECOND]: newTime.second(),
      });
    }
  }, [noteDetails.scheduleTime]);

  const open = Boolean(anchorEl);

  const openDatePicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeDate = (date: Moment | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const changeTime = (unit: TimerType, value: number) => {
    if (flipTime[unit] === value) return;
    setFlipTime(prevFlipTime => ({
      ...prevFlipTime,
      [unit]: value,
    }));
  };

  const handleSave = () => {
    const combinedDateTime = selectedDate.clone().set({
      hour: flipTime[TimerType.HOUR],
      minute: flipTime[TimerType.MINUTE],
      second: flipTime[TimerType.SECOND],
    });
    const newDetail = { ...noteDetails };
    newDetail.scheduleTime = combinedDateTime.toISOString();
    if (newDetail.isVitrual) {
      dispatch(NoteDetailsSlice.actions.updateVitrual(newDetail));
    } else {
      dispatch(NoteDetailsSlice.actions.updatedLoad(newDetail));
    }
    setIsEdit(false);
    handleClose();
  };

  const resetDateTime = () => {
    setSelectedDate(moment(noteDetails.scheduleTime));
  };
  return (
    <Textarea
      minRows={2}
      color="warning"
      variant="soft"
      size="sm"
      value={valContent}
      readOnly={!noteDetails?.isVitrual}
      onChange={e => changeContent(noteDetails, e.target.value)}
      startDecorator={
        <Box>
          <Chip
            color="warning"
            variant="outlined"
            icon={<ScheduleRounded />}
            label={`Schedule: ${Helper.formatDateTime(noteDetails.scheduleTime)}`}
            onClick={openDatePicker}
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box className="schedule_header">
                <FlipTimer scheduleTime={flipTime} changeTime={changeTime} isEdit={isEdit} />
                <Box>
                  {!isEdit && (
                    <Tooltip title={TooltipTitle.EDT}>
                      <IconButton
                        onClick={() => {
                          setIsEdit(true);
                          resetDateTime();
                        }}
                      >
                        <EditRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isEdit && (
                    <Tooltip title={TooltipTitle.SAVE}>
                      <IconButton onClick={handleSave}>
                        <CheckRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isEdit && (
                    <Tooltip title={TooltipTitle.DEL}>
                      <IconButton
                        onClick={() => {
                          setIsEdit(false);
                          resetDateTime();
                        }}
                      >
                        <CancelRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              <DateCalendar
                value={selectedDate}
                disabled={!isEdit}
                disablePast
                onChange={changeDate}
              />
            </LocalizationProvider>
          </Menu>
        </Box>
      }
    />
  );
}
