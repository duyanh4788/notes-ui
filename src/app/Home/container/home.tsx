import { Box } from '@mui/material';
import { AuthContext } from 'app/hoc/AuthContextApi';
import { Users } from 'interface/users';
import { useContext } from 'react';
import { Navbar } from '../component/navbar';
import { TreesNotes } from '../component/tree-notes';
import { Advertising } from 'components/advertising';

export const Home = () => {
  const userInfor: Users = useContext(AuthContext);

  return (
    <Box>
      <Navbar userInfor={userInfor} />
      <Box sx={{ m: '20px' }}>
        <Advertising />
      </Box>
      <TreesNotes />
    </Box>
  );
};
