import { FunctionComponent } from 'react';
import * as Router from './lazyRouting';
import { PATH_PARAMS } from '../commom/contants';

export interface AppRoute {
  key: number;
  path: string;
  title: string;
  Component: FunctionComponent;
  displayOrder?: number;
}

export const AppRouting: AppRoute[] = [
  { key: 1, path: PATH_PARAMS.REPLACE, title: 'Home', Component: Router.Home },
  { key: 2, path: PATH_PARAMS.HOME, title: 'Home', Component: Router.Home },
  { key: 3, path: PATH_PARAMS.SIGNIN, title: 'Signin', Component: Router.Signin },
];
