import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

const aliases = [
  { find: 'router', replacement: 'src/router' },
  { find: 'store', replacement: 'src/store' },
  { find: 'app', replacement: 'src/app' },
  { find: 'commom', replacement: 'src/commom' },
  { find: 'hooks', replacement: 'src/hooks' },
  { find: 'interface', replacement: 'src/interface' },
  { find: 'services', replacement: 'src/services' },
  { find: 'utils', replacement: 'src/utils' },
  { find: 'components', replacement: 'src/components' },
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_NODE_ENV === 'production' ? env.VITE_BASE_URL : '',
    resolve: {
      alias: aliases.map(alias => ({
        ...alias,
        replacement: path.resolve(__dirname, alias.replacement),
      })),
    },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['axios', 'moment'],
          },
        },
      },
    },
    server: {
      open: true,
      port: Number(env.VITE_PORT),
    },
    plugins: [react()],
  };
});
