import * as React from 'react';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { FormControl, FormLabel, TextareaAutosize } from '@mui/material';

export default function TexArea() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <FormControl>
      <TextareaAutosize placeholder="Type something here…" minRows={3} />
    </FormControl>
  );
}
