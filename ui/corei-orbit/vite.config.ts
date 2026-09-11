import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname);

function isPathSafe(targetPath: string): boolean {
  const resolved = path.resolve(PROJECT_ROOT, targetPath);
  return resolved.startsWith(PROJECT_ROOT);
}

const fileApiPlugin = (): Plugin => {
  return {
    name: 'file-api-plugin',
    configureServer(server) {
      console.log('🔥 File API plugin: configureServer called');

      server.middlewares.use('/api-files', async (req, res) => {
        console.log('🔥 File API request received:', req.url);

        const url = new URL(req.url || '', `http://${req.headers.host}`);
        // ─── FIX: proper path extraction ──────────────────────────────
        const pathParts = url.pathname.split('/').filter(part => part !== '' && part !== 'api-files');
        const action = pathParts.length > 0 ? pathParts[0] : 'list';
        console.log('🔥 Action:', action);

        const sendError = (status: number, message: string) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: message }));
        };

        if (req.method !== 'GET' && req.method !== 'POST') {
          sendError(405, 'Method Not Allowed');
          return;
        }

        try {
          if (req.method === 'GET') {
            if (action === 'list') {
              const dir = url.searchParams.get('path') || '';
              if (!isPathSafe(dir)) return sendError(403, 'Forbidden');
              const fullPath = path.resolve(PROJECT_ROOT, dir);
              const entries = await fs.readdir(fullPath, { withFileTypes: true });
              const items = entries.map((entry) => ({
                name: entry.name,
                isDirectory: entry.isDirectory(),
                path: path.join(dir, entry.name),
              }));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ items }));
              console.log(`📂 Listed directory: ${dir || '/'} (${items.length} items)`);
              return;
            }

            if (action === 'read') {
              const filePath = url.searchParams.get('path') || '';
              if (!isPathSafe(filePath)) return sendError(403, 'Forbidden');
              const fullPath = path.resolve(PROJECT_ROOT, filePath);
              const content = await fs.readFile(fullPath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ content }));
              console.log(`📄 Read file: ${filePath}`);
              return;
            }

            sendError(404, `Unknown action: ${action}`);
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => body += chunk);
            await new Promise((resolve) => req.on('end', resolve));
            const data = JSON.parse(body);

            if (action === 'write') {
              const { path: filePath, content } = data;
              if (!isPathSafe(filePath)) return sendError(403, 'Forbidden');
              const fullPath = path.resolve(PROJECT_ROOT, filePath);
              await fs.mkdir(path.dirname(fullPath), { recursive: true });
              await fs.writeFile(fullPath, content, 'utf-8');
              res.end(JSON.stringify({ success: true }));
              console.log(`✏️ Wrote file: ${filePath}`);
              return;
            }

            if (action === 'mkdir') {
              const { path: folderPath } = data;
              if (!isPathSafe(folderPath)) return sendError(403, 'Forbidden');
              const fullPath = path.resolve(PROJECT_ROOT, folderPath);
              await fs.mkdir(fullPath, { recursive: true });
              res.end(JSON.stringify({ success: true }));
              console.log(`📁 Created folder: ${folderPath}`);
              return;
            }

            if (action === 'rename') {
              const { oldPath, newPath } = data;
              if (!isPathSafe(oldPath) || !isPathSafe(newPath)) return sendError(403, 'Forbidden');
              const fullOld = path.resolve(PROJECT_ROOT, oldPath);
              const fullNew = path.resolve(PROJECT_ROOT, newPath);
              await fs.rename(fullOld, fullNew);
              res.end(JSON.stringify({ success: true }));
              console.log(`🔄 Renamed: ${oldPath} → ${newPath}`);
              return;
            }

            if (action === 'delete') {
              const { path: filePath } = data;
              if (!isPathSafe(filePath)) return sendError(403, 'Forbidden');
              const fullPath = path.resolve(PROJECT_ROOT, filePath);
              await fs.rm(fullPath, { recursive: true, force: true });
              res.end(JSON.stringify({ success: true }));
              console.log(`🗑️ Deleted: ${filePath}`);
              return;
            }

            if (action === 'copy') {
              const { srcPath, destPath } = data;
              if (!isPathSafe(srcPath) || !isPathSafe(destPath)) return sendError(403, 'Forbidden');
              const fullSrc = path.resolve(PROJECT_ROOT, srcPath);
              const fullDest = path.resolve(PROJECT_ROOT, destPath);
              await fs.cp(fullSrc, fullDest, { recursive: true });
              res.end(JSON.stringify({ success: true }));
              console.log(`📋 Copied: ${srcPath} → ${destPath}`);
              return;
            }

            sendError(404, `Unknown action: ${action}`);
            return;
          }
        } catch (err) {
          sendError(500, (err as any).message);
        }
      });
    },
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), fileApiPlugin()],
    server: {

      host: '0.0.0.0',
      port: 5175,
      strictPort: true,
      proxy: {
        '/api/broker': {
          target: 'http://10.105.105.222:8003',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/broker/, '/broker'),
        },
        // ─── NEW: Connect to status-server.js on port 3000 ──────────
        '/api/v1': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        // ────────────────────────────────────────────────────────────
        '/api/n8n': {
          target: env.VITE_N8N_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/n8n/, ''),
        },
        '/api/binance': {
          target: 'https://api.binance.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/binance/, '/api'),
        },
      },
    },
  };
});
