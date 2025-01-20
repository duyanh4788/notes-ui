import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as UserSlice from 'store/users/shared/slice';
import * as UserSelector from 'store/users/shared/selectors';
import { Advertising } from 'components/Advertising';

export const Signin = () => {
  const selectUrlGg = useSelector(UserSelector.selectUrlGg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectUrlGg) {
      window.location.href = selectUrlGg;
    }
  }, [selectUrlGg]);

  const handleLogin = () => {
    dispatch(UserSlice.actions.signInLoad());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Advertising />
      <button className="btn_login_gg" onClick={handleLogin}>
        Sign in with Google
      </button>
    </Box>
  );
};
