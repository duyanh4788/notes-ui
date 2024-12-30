import { Middleware } from 'redux';
import { Action } from '@reduxjs/toolkit';
import { actions } from './slice';

function isActionWithType(action: unknown): action is Action<string> {
  return (action as Action<string>)?.type !== undefined;
}

export const loadingMiddleware: Middleware = store => next => (action: unknown) => {
  if (isActionWithType(action)) {
    if (action.type.includes('pending')) {
      store.dispatch(actions.startLoading());
    }
    const result = next(action);
    if (action.type.includes('fulfilled') || action.type.includes('rejected')) {
      store.dispatch(actions.stopLoading());
    }
    return result;
  }
  return next(action);
};
