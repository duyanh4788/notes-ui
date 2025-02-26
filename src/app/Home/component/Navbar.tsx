import { ExitToAppRounded, HomeRounded } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { PATH_PARAMS, TooltipTitle } from 'commom/contants';
import { Users } from 'interface/users';
import { useNavigate } from 'react-router-dom';
import * as UserSlice from 'store/users/shared/slice';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { LocalStorageService } from 'services/localStorage';
import { AuthContext } from 'app/hoc/AuthContex';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d6cfc957',
    },
  },
});

export const Navbar = () => {
  const userInfor: Users = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfor || !userInfor.id) {
      LocalStorageService.clearLocalStorage();
      navigate(PATH_PARAMS.SIGNIN);
    }
  }, [userInfor]);

  const signOut = () => {
    dispatch(UserSlice.actions.signOutLoad());
  };

  return (
    <Stack sx={{ flexGrow: 1, marginBottom: '100px' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav">
          <Toolbar disableGutters style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
            <Box sx={{ ml: 2 }}>
              <Tooltip title={TooltipTitle.SING_OUT}>
                <ExitToAppRounded onClick={signOut} />
              </Tooltip>
              <Tooltip title={TooltipTitle.HOME}>
                <HomeRounded onClick={() => navigate(PATH_PARAMS.HOME)} />
              </Tooltip>
            </Box>
            <Box sx={{ mr: 2 }}>
              <Tooltip
                arrow
                open
                placement="left-start"
                title={`${userInfor?.userName} 📁: ${userInfor.notesCount || 0} | 📝: ${userInfor.noteDetailsCount || 0}`}
              >
                <Avatar src={userInfor?.avatar}>{userInfor?.userName}</Avatar>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};
