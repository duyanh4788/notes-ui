import { ExitToAppRounded, HomeRounded } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { PATH_PARAMS } from 'commom/contants';
import { Users } from 'interface/users';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from 'services/localStorage';
import * as UserSlice from 'store/users/shared/slice';
import { useDispatch } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d6cfc957',
    },
  },
});
interface Props {
  userInfor: Users;
}

export const Navbar: React.FC<Props> = ({ userInfor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {};

  const signOut = () => {
    dispatch(UserSlice.actions.signOut());
    LocalStorageService.clearLocalStorage();
    navigate(PATH_PARAMS.SIGNIN);
  };

  return (
    <Stack sx={{ flexGrow: 1, marginBottom: '100px' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav">
          <Toolbar disableGutters style={{ cursor: 'pointer' }}>
            <ExitToAppRounded onClick={signOut} />
            <HomeRounded color="success" onClick={() => navigate(PATH_PARAMS.HOME)} />
            <Tooltip title={userInfor?.userName}>
              <Avatar src={userInfor?.avatar} onClick={handleClick}>
                {userInfor?.userName}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};
