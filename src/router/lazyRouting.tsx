import { LoaderFallBack } from '../components/loading';
import { lazyLoad } from './loadable';

export const Home = lazyLoad(
  () => import('app'),
  module => module.Home,
  LoaderFallBack(),
);

export const Signin = lazyLoad(
  () => import('app'),
  module => module.Signin,
  LoaderFallBack(),
);
