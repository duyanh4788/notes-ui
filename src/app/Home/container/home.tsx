import { Box, FormControlLabel, Switch, Tooltip } from '@mui/material';
import { AuthContext } from 'app/hoc/AuthContextApi';
import { Users } from 'interface/users';
import { useContext, useState } from 'react';
import { Navbar } from '../component/navbar';
import { TreesNotes } from '../component/tree-notes';
import { Advertising } from 'components/advertising';

export const Home = () => {
  const userInfor: Users = useContext(AuthContext);
  const [isAdd, setIsAdd] = useState<boolean>(true);

  const handleChange = event => {
    setIsAdd(event.target.checked);
  };
  return (
    <Box>
      <Navbar userInfor={userInfor} />
      <Box sx={{ m: '20px' }}>
        <Tooltip title="On/Off Title">
          <Switch size="small" color="primary" checked={isAdd} onChange={handleChange} />
        </Tooltip>

        {isAdd && <Advertising />}
        <TreesNotes />
      </Box>
    </Box>
  );
};
