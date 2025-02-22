import { Copyright, EmailRounded, GitHub } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="footer">
      <Box className="infor">
        <Typography>
          <Copyright /> Copyright 2025 by Anh Vu
        </Typography>
        <Typography>
          <EmailRounded /> duyanh4788@gmail.com
        </Typography>
        <Typography>
          <GitHub />{' '}
          <a target="blank" href="https://github.com/duyanh4788">
            https://github.com/duyanh4788
          </a>
        </Typography>
      </Box>
    </Box>
  );
};
