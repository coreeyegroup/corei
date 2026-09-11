import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
let config: any = {};
const configPath = path.join(__dirname, '../docs.config.json');
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

const docsRoot = config.docsRoot || process.env.DOCS_ROOT || path.join(__dirname, '../public/content');
const sourceRoot = config.sourceRoot || process.env.SOURCE_ROOT || path.join(__dirname, '../../corei-os/src');

const resolvedDocsRoot = path.resolve(docsRoot);
const resolvedSourceRoot = path.resolve(sourceRoot);

console.log(`📁 Docs root: ${resolvedDocsRoot}`);

if (!fs.existsSync(resolvedDocsRoot)) {
  console.error(`❌ Docs directory not found: ${resolvedDocsRoot}`);
  process.exit(1);
}

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = glob.sync(`${resolvedDocsRoot}/**/*.md`);
console.log(`🔍 Found ${files.length} markdown files`);

const docs: any[] = [];

// Helper to extract number from string like "stage-25" or "phase02"
function extractNumber(str: string, prefix: string): number {
  const regex = new RegExp(`${prefix}[-_]?(\\d+)`, 'i');
  const match = str.match(regex);
  return match ? parseInt(match[1], 10) : 0;
}

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  const relativePath = path.relative(resolvedDocsRoot, file);
  const parts = relativePath.split(path.sep);

  // Try to extract stage, phase, step from frontmatter first
  let stage = data.stage || 0;
  let phase = data.phase || 0;
  let step = data.step || 0;

  // If missing, try to parse from folder names
  if (stage === 0) {
    for (const p of parts) {
      const num = extractNumber(p, 'stage');
      if (num > 0) { stage = num; break; }
    }
  }
  if (phase === 0) {
    for (const p of parts) {
      const num = extractNumber(p, 'phase');
      if (num > 0) { phase = num; break; }
    }
  }
  if (step === 0) {
    // Try to extract from filename (e.g., step-01.md, 01-step.md, or just a number)
    const filename = path.basename(file, '.md');
    const stepMatch = filename.match(/step[-_]?(\d+)/i) || filename.match(/^(\d+)/);
    if (stepMatch) {
      step = parseInt(stepMatch[1], 10);
    }
  }

  // Fallback defaults if still zero
  if (stage === 0) stage = 25;   // default to Stage-25
  if (phase === 0) phase = 18;   // default to Phase-18
  if (step === 0) step = files.indexOf(file) + 1; // unique step per file

  const title = data.title || path.basename(file, '.md');

  docs.push({
    id: `stage-${stage}-phase-${phase}-step-${step}`,
    stage,
    phase,
    step,
    title,
    content,
    status: data.status || 'PENDING',
    commit: data.commit || '',
    tag: data.tag || '',
    updated: data.updated || '',
    source_files: data.source_files || [],
    slug: `stage-${stage}-phase-${phase}-step-${step}`,
    phaseTitle: data.phaseTitle || `Phase ${phase}`,
    filePath: file,
  });
}

const indexFile = path.join(outputDir, 'search-index.json');
fs.writeFileSync(indexFile, JSON.stringify(docs, null, 2));
console.log(`✅ Search index written to ${indexFile} (${docs.length} documents)`);

// Copy source files (optional)
const sourceTargetDir = path.join(__dirname, '../public/source');
if (fs.existsSync(resolvedSourceRoot)) {
  if (fs.existsSync(sourceTargetDir)) {
    fs.rmSync(sourceTargetDir, { recursive: true, force: true });
  }
  fs.cpSync(resolvedSourceRoot, sourceTargetDir, { recursive: true });
  console.log(`✅ Copied source files to ${sourceTargetDir}`);
} else {
  console.warn(`⚠️ Source root not found: ${resolvedSourceRoot}`);
}

console.log('✅ Build complete.');
