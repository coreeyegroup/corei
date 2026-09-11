import { watch } from 'chokidar';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load config to know which directory to watch
let config: any = {};
const configPath = path.join(__dirname, '../docs.config.json');
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

const docsRoot = config.docsRoot || process.env.DOCS_ROOT || path.join(__dirname, '../public/content');

console.log(`👀 Watching for changes in ${docsRoot}...`);

const watcher = watch(docsRoot, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
});

watcher.on('all', (event, filePath) => {
  console.log(`📄 ${event}: ${filePath}`);
  exec('pnpm build-docs', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Rebuild failed:', stderr);
      return;
    }
    console.log('✅ Rebuilt documentation index.');
  });
});

console.log('✅ Watcher started. Press Ctrl+C to stop.');
