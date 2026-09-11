// src/components/LeftSidebar/fileIcons.ts
import {
  FileJson,
  FileCode,
  FileText,
  File,
  Folder,
  FolderOpen,
  FileSpreadsheet,
  FileArchive,
  FileInput,
} from 'lucide-react';

const extensionMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  // Config & Data
  json: FileJson,
  yaml: FileJson,
  yml: FileJson,
  xml: FileCode,
  toml: FileCode,

  // Code
  ts: FileCode,
  tsx: FileCode,
  js: FileCode,
  jsx: FileCode,
  py: FileCode,
  go: FileCode,
  rs: FileCode,
  java: FileCode,
  c: FileCode,
  cpp: FileCode,
  h: FileCode,
  hpp: FileCode,
  rb: FileCode,
  php: FileCode,
  swift: FileCode,
  kt: FileCode,
  dart: FileCode,
  lua: FileCode,
  r: FileCode,
  sql: FileCode,
  graphql: FileCode,

  // Web
  css: File,
  scss: File,
  less: File,
  html: FileCode,
  htm: FileCode,
  vue: FileCode,
  svelte: FileCode,

  // Markdown — use FileText
  md: FileText,
  markdown: FileText,

  // Data
  csv: FileSpreadsheet,
  tsv: FileSpreadsheet,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,

  // Images
  png: File,
  jpg: File,
  jpeg: File,
  gif: File,
  svg: File,
  ico: File,
  webp: File,

  // Docs
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  ppt: FileText,
  pptx: FileText,

  // Archives
  zip: FileArchive,
  rar: FileArchive,
  tar: FileArchive,
  gz: FileArchive,
  bz2: FileArchive,

  // Other
  sh: FileInput,
  bash: FileInput,
  env: FileText,
  txt: FileText,
  log: FileText,
  dockerfile: FileCode,
  gitignore: FileText,
  npmrc: FileText,
  lock: FileText,
};

export function getFileIcon(filename: string): React.FC<{ size?: number; className?: string }> {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return extensionMap[ext] || File;
}

export { Folder, FolderOpen };
