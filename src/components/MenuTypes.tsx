import { CodeRounded, NoteAddRounded, ScheduleRounded } from '@mui/icons-material';
import { Box, Fade, IconButton, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NoteDetailType, TooltipTitle } from 'commom/contants';
import { NoteDetails } from 'interface/noteDetails';
import { useState } from 'react';

interface Props {
  noteDetails: NoteDetails;
  getType: (noteDetail: NoteDetails) => void;
}

export const MenuTypes = (props: Props) => {
  const { noteDetails, getType } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type: NoteDetailType) => {
    setAnchorEl(null);
    const newDetail = { ...noteDetails };
    newDetail.type = type;
    getType(newDetail);
  };

  const renderType = () => {
    switch (noteDetails.type) {
      case NoteDetailType.STRING:
        return <NoteAddRounded />;
      case NoteDetailType.CODE:
        return <CodeRounded />;
      case NoteDetailType.SCHEDULE:
        return <ScheduleRounded />;
      default:
        return <NoteAddRounded />;
    }
  };

  return (
    <Box>
      <Tooltip title={`${TooltipTitle.SEL_TYPE}: ${noteDetails.type}`}>
        <IconButton onClick={handleClick}>{renderType()}</IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
      >
        {Object.values(NoteDetailType)
          .filter(x => x !== NoteDetailType.UPLOAD_FILE)
          .map(type => {
            return (
              <MenuItem
                key={type}
                onClick={() => handleClose(type)}
                selected={noteDetails.type === type}
              >
                {type}
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};
