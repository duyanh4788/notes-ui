import { Box, Switch, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AuthContext } from 'app/hoc/AuthContextApi';
import { Users } from 'interface/users';
import { useContext, useState } from 'react';
import { Navbar } from '../component/navbar';
import { TreesNotes } from '../component/tree-notes';
import { Advertising } from 'components/advertising';
import { TitleProject, TitleTech } from 'commom/contants';

export const Home = () => {
  const userInfor: Users = useContext(AuthContext);
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [isTech, setIsTech] = useState<boolean>(true);

  const handleAdd = event => {
    setIsAdd(event.target.checked);
  };
  const handleTech = event => {
    setIsTech(event.target.checked);
  };
  return (
    <Box>
      <Navbar userInfor={userInfor} />
      <Box sx={{ m: '20px' }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Tooltip title="On/Off Title Projet">
              <Switch size="small" color="primary" checked={isAdd} onChange={handleAdd} />
            </Tooltip>
            {isAdd && <Advertising texts={TitleProject} />}
          </Grid>
          <Grid size={6}>
            <Tooltip title="On/Off Title Tech">
              <Switch size="small" color="primary" checked={isTech} onChange={handleTech} />
            </Tooltip>
            {isTech && <Advertising texts={TitleTech} />}
          </Grid>
        </Grid>

        <TreesNotes />
      </Box>
    </Box>
  );
};
