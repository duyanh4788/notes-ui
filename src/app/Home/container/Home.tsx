import { Box } from '@mui/material';
import { Users } from 'interface/users';
import { useContext } from 'react';
import { Navbar } from '../component/Navbar';
import { NotesList } from '../component/NotesList';
import { Advertising } from 'components/Advertising';
import { AuthContext } from 'app/hoc/AuthContex';

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
