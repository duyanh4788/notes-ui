import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppRouting } from 'router/AppRouting';
import { Loading } from 'components/Loading';
import { Provider } from 'react-redux';
import { RootStore } from 'store/store';
import { AuthContextProvider } from 'app/hoc/AuthContextApi';
import { Toast } from 'components/Toast';
import { baseProps } from 'utils/config';

export const ConnectedApp = () => (
  <BrowserRouter {...baseProps}>
    <Provider store={RootStore}>
      <AuthContextProvider>
        <Box component="section">
          <Box component="main">
            <Loading />
            <Toast />
            <Routes>
              {AppRouting.map(item => {
                const { key, path, Component, title } = item;
                return (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <React.Fragment>
                        <title>{title}</title>
                        <meta name="description" content={title} />
                        <Component />
                      </React.Fragment>
                    }
                  />
                );
              })}
            </Routes>
          </Box>
        </Box>
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
);
