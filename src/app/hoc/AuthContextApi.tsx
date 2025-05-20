import { PATH_PARAMS } from 'commom/contants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey, LocalStorageService } from 'services/localStorage';
import * as UserSlice from 'store/users/shared/slice';
import * as UserSelector from 'store/users/shared/selectors';
import { AuthContext } from './AuthContex';
import { baseProps } from 'utils/config';

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken: string | null = LocalStorageService.getItem(LocalStorageKey.userToken);
  const userInfor = useSelector(UserSelector.selectUserInfor);

  useEffect(() => {
    function handleUser(tokenStore: string | null) {
      if (tokenStore) {
        dispatch(UserSlice.actions.getByIdLoad());
        const baseUrl = baseProps?.basename
          ? baseProps.basename + PATH_PARAMS.SIGNIN
          : PATH_PARAMS.SIGNIN;
        if (window.location.pathname === baseUrl) {
          return navigate(PATH_PARAMS.HOME);
        }
        return;
      }
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const token = urlParams.get('token');

      if (userId && token) {
        LocalStorageService.setItem({ key: LocalStorageKey.userId, value: userId });
        LocalStorageService.setItem({ key: LocalStorageKey.userToken, value: token });
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        return dispatch(UserSlice.actions.getByIdLoad());
      }
      return navigate(PATH_PARAMS.SIGNIN);
    }
    handleUser(userToken);
  }, [dispatch, navigate, userToken]);

  return <AuthContext.Provider value={userInfor || {}}>{children}</AuthContext.Provider>;
};
