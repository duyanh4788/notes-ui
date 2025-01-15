import { Avatar, Box, Fade, IconButton, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LangCodes } from 'commom/contants';
import { useState } from 'react';

interface Props {
  langCode: string;
  setLangCode: (langCode: string) => void;
}

export const MenuLangs = (props: Props) => {
  const { langCode, setLangCode } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Tooltip title={langCode}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 24, height: 24 }}>
            {LangCodes.find(x => x.value === langCode)?.shortName || langCode}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        {LangCodes.map(lang => {
          return (
            <MenuItem
              key={lang.label}
              onClick={() => {
                setAnchorEl(null);
                setLangCode(lang.value);
              }}
              selected={langCode === lang.value}
            >
              {lang.value}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
