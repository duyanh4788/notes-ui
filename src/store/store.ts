import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { loadingMiddleware } from './loading/middleware';
import { userMiddleware } from './users/middleware';

function configureAppstore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false })
        .concat(sagaMiddleware)
        .concat(loadingMiddleware)
        .concat(userMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
export const RootStore = configureAppstore();

export type RootState = ReturnType<typeof RootStore.getState>;
export type AppDispatch = typeof RootStore.dispatch;
