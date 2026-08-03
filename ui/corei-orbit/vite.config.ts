import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {

    plugins: [react()],

    server: {

      host: '0.0.0.0',

      port: 5175,

      strictPort: true,

      proxy: {

        '/api/n8n': {

          target: env.VITE_N8N_PROXY_TARGET,

          changeOrigin: true,

          rewrite: (path) => path.replace(/^\/api\/n8n/, ''),

        },

      },

    },

  };

});
