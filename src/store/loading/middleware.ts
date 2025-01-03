import { Middleware } from 'redux';
import { Action } from '@reduxjs/toolkit';
import { actions } from './slice';

function isActionWithType(action: unknown): action is Action<string> {
  return (action as Action<string>)?.type !== undefined;
}

export const loadingMiddleware: Middleware = store => next => (action: unknown) => {
  if (isActionWithType(action)) {
    if (action.type === 'loading/startLoading' || action.type === 'loading/stopLoading') {
      return next(action);
    }
    if (action.type.includes('Success') || action.type.includes('Fail')) {
      store.dispatch(actions.startLoading());
    }
    if (action.type.includes('Success') || action.type.includes('Fail')) {
      store.dispatch(actions.stopLoading());
    }
    return next(action);
  }
  return next(action);
};
