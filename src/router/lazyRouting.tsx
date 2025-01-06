import { LoaderFallBack } from '../components/Loading';
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
