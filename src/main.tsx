import { createRoot } from 'react-dom/client';
import { ConnectedApp } from 'router/ConnectedApp';
import '../src/assets/styles/index.scss';
import 'swiper/css';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const render = () => {
  createRoot(MOUNT_NODE).render(<ConnectedApp />);
};

render();
