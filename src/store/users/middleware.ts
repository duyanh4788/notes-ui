import { Middleware } from 'redux';
import { Action } from '@reduxjs/toolkit';
import { actions } from './shared/slice';

function isActionWithType(action: unknown): action is Action<string> {
  return (action as Action<string>)?.type !== undefined;
}

export const userMiddleware: Middleware = store => next => (action: unknown) => {
  if (isActionWithType(action)) {
    if (['notes/updateNotes', 'noteDetails/updateNoteDetails'].includes(action.type)) {
      store.dispatch(actions.getByIdLoad());
    }
    return next(action);
  }
  return next(action);
};
