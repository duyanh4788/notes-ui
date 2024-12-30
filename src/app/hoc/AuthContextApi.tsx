import { PATH_PARAMS } from 'commom/contants';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey, LocalStorageService } from 'services/localStorage';
import * as UserSlice from 'store/users/shared/slice';
import * as UserSelector from 'store/users/shared/selectors';

export const AuthContext = React.createContext({});
export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken: string | null = LocalStorageService.getItem(LocalStorageKey.userToken);
  const userInfor = useSelector(UserSelector.selectUserInfor);

  useEffect(() => {
    function handleUser(tokenStore: string | null) {
      if (tokenStore) {
        return dispatch(UserSlice.actions.getById());
      }
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const token = urlParams.get('token');

      if (userId && token) {
        LocalStorageService.setItem({ key: LocalStorageKey.userId, value: userId });
        LocalStorageService.setItem({ key: LocalStorageKey.userToken, value: token });
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        return dispatch(UserSlice.actions.getById());
      }
      return navigate(PATH_PARAMS.SIGNIN);
    }
    handleUser(userToken);
  }, [dispatch, navigate, userToken]);

  return <AuthContext.Provider value={userInfor || {}}>{children}</AuthContext.Provider>;
};
