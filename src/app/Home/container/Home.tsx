import { Box } from '@mui/material';
import { AuthContext } from 'app/hoc/AuthContextApi';
import { Users } from 'interface/users';
import { useContext } from 'react';
import { Navbar } from '../component/Navbar';
import { NotesList } from '../component/NotesList';
import { Advertising } from 'components/Advertising';

export const Home = () => {
  const userInfor: Users = useContext(AuthContext);

  return (
    <Box>
      <Navbar userInfor={userInfor} />
      <Box sx={{ m: '20px' }}>
        <Advertising />
        <NotesList />
      </Box>
    </Box>
  );
};
