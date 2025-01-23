import { Box } from '@mui/material';
import { Navbar } from '../component/Navbar';
import { NotesList } from '../component/NotesList';
import { Advertising } from 'components/Advertising';

export const Home = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ m: '20px' }}>
        <Advertising />
        <NotesList />
      </Box>
    </Box>
  );
};
