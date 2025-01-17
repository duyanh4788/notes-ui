import { createRoot } from 'react-dom/client';
import { ConnectedApp } from 'router/ConnectedApp';
import '../src/assets/styles/index.scss';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const render = () => {
  createRoot(MOUNT_NODE).render(<ConnectedApp />);
};

render();
