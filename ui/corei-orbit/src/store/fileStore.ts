// src/store/fileStore.ts
import { create } from 'zustand';
import { listDirectory, readFile, writeFile } from '../services/fileService';
import type { FileItem } from '../services/fileService';

export interface OpenFile {
  path: string;
  content: string;
  language: string;
  isDirty: boolean;
}

interface FileState {
  tree: FileItem[];
  expandedPaths: Set<string>;
  openFiles: OpenFile[];
  activeFilePath: string | null;
  isLoading: boolean;
  error: string | null;
  loadDirectory: (path: string) => Promise<void>;
  toggleExpand: (path: string) => void;
  openFile: (path: string) => Promise<void>;
  closeFile: (path: string, force?: boolean) => { cancelled: boolean; dirty?: boolean };
  setActiveFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  saveFile: (path: string, content?: string) => Promise<void>;
  setDirty: (path: string, isDirty: boolean) => void;
}

function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    json: 'json',
    css: 'css',
    scss: 'scss',
    html: 'html',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    xml: 'xml',
    sh: 'shell',
    bash: 'shell',
    py: 'python',
    go: 'go',
    rs: 'rust',
    c: 'c',
    cpp: 'cpp',
    h: 'c',
    hpp: 'cpp',
    java: 'java',
    rb: 'ruby',
    php: 'php',
    swift: 'swift',
    kt: 'kotlin',
    dart: 'dart',
    lua: 'lua',
    r: 'r',
    sql: 'sql',
    graphql: 'graphql',
    vue: 'vue',
    svelte: 'svelte',
    dockerfile: 'dockerfile',
    gitignore: 'gitignore',
    env: 'plaintext',
    txt: 'plaintext',
    log: 'plaintext',
    csv: 'plaintext',
    tsv: 'plaintext',
    svg: 'plaintext',
    png: 'plaintext',
    jpg: 'plaintext',
    jpeg: 'plaintext',
    gif: 'plaintext',
    ico: 'plaintext',
    woff: 'plaintext',
    woff2: 'plaintext',
    ttf: 'plaintext',
    eot: 'plaintext',
    otf: 'plaintext',
    mp4: 'plaintext',
    webm: 'plaintext',
    avi: 'plaintext',
    mov: 'plaintext',
    mkv: 'plaintext',
    flv: 'plaintext',
    m4v: 'plaintext',
    mp3: 'plaintext',
    wav: 'plaintext',
    flac: 'plaintext',
    ogg: 'plaintext',
    pdf: 'plaintext',
    doc: 'plaintext',
    docx: 'plaintext',
    xls: 'plaintext',
    xlsx: 'plaintext',
    ppt: 'plaintext',
    pptx: 'plaintext',
    zip: 'plaintext',
    rar: 'plaintext',
    tar: 'plaintext',
    gz: 'plaintext',
    bz2: 'plaintext',
    '7z': 'plaintext',
  };
  return map[ext] || 'plaintext';
}

export const useFileStore = create<FileState>((set, get) => ({
  tree: [],
  expandedPaths: new Set<string>(),
  openFiles: [],
  activeFilePath: null,
  isLoading: false,
  error: null,

  loadDirectory: async (dirPath: string) => {
    set({ isLoading: true, error: null });
    try {
      const { items } = await listDirectory(dirPath);
      set({ tree: items, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  toggleExpand: (path: string) => {
    const { expandedPaths } = get();
    const newSet = new Set(expandedPaths);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    set({ expandedPaths: newSet });
  },

  openFile: async (filePath: string) => {
    const { openFiles } = get();
    const existing = openFiles.find((f: OpenFile) => f.path === filePath);
    if (existing) {
      set({ activeFilePath: filePath });
      return;
    }
    try {
      const { content } = await readFile(filePath);
      const language = getLanguageFromPath(filePath);
      const newFile: OpenFile = {
        path: filePath,
        content,
        language,
        isDirty: false,
      };
      set((state: FileState) => ({
        openFiles: [...state.openFiles, newFile],
        activeFilePath: filePath,
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  closeFile: (filePath: string, force: boolean = false) => {
    const { openFiles, activeFilePath } = get();
    const file = openFiles.find(f => f.path === filePath);
    if (file?.isDirty && !force) {
      return { cancelled: true, dirty: true };
    }
    const newFiles = openFiles.filter((f: OpenFile) => f.path !== filePath);
    let newActive = activeFilePath;
    if (activeFilePath === filePath) {
      newActive = newFiles.length > 0 ? newFiles[newFiles.length - 1].path : null;
    }
    set({ openFiles: newFiles, activeFilePath: newActive });
    return { cancelled: false };
  },

  setActiveFile: (filePath: string) => {
    set({ activeFilePath: filePath });
  },

  updateFileContent: (filePath: string, content: string) => {
    const { openFiles } = get();
    const updated = openFiles.map((f: OpenFile) =>
      f.path === filePath ? { ...f, content, isDirty: true } : f
    );
    set({ openFiles: updated });
  },

  saveFile: async (filePath: string, content?: string) => {
    const { openFiles } = get();
    const file = openFiles.find((f: OpenFile) => f.path === filePath);
    if (!file) return;
    const finalContent = content !== undefined ? content : file.content;
    try {
      await writeFile(filePath, finalContent);
      const updated = openFiles.map((f: OpenFile) =>
        f.path === filePath ? { ...f, content: finalContent, isDirty: false } : f
      );
      set({ openFiles: updated });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  setDirty: (filePath: string, isDirty: boolean) => {
    const { openFiles } = get();
    const updated = openFiles.map((f: OpenFile) =>
      f.path === filePath ? { ...f, isDirty } : f
    );
    set({ openFiles: updated });
  },
}));
