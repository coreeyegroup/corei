// src/services/fileService.ts

export interface FileItem {
  name: string;
  isDirectory: boolean;
  path: string;
}

export interface ListResponse {
  items: FileItem[];
}

export interface ReadResponse {
  content: string;
}

export interface WriteResponse {
  success: boolean;
}

// ─── File operations ────────────────────────────────────────────────────

export async function listDirectory(dirPath: string = ''): Promise<ListResponse> {
  const res = await fetch(`/api-files/list?path=${encodeURIComponent(dirPath)}`);
  if (!res.ok) {
    let errMsg = 'Failed to list directory';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function readFile(filePath: string): Promise<ReadResponse> {
  const res = await fetch(`/api-files/read?path=${encodeURIComponent(filePath)}`);
  if (!res.ok) {
    let errMsg = 'Failed to read file';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function writeFile(filePath: string, content: string): Promise<WriteResponse> {
  const res = await fetch('/api-files/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: filePath, content }),
  });
  if (!res.ok) {
    let errMsg = 'Failed to write file';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

// ─── New operations for context menu ──────────────────────────────────

export async function createFile(filePath: string): Promise<WriteResponse> {
  return writeFile(filePath, '');
}

export async function createFolder(folderPath: string): Promise<{ success: boolean }> {
  const res = await fetch('/api-files/mkdir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: folderPath }),
  });
  if (!res.ok) {
    let errMsg = 'Failed to create folder';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function renameFile(oldPath: string, newPath: string): Promise<{ success: boolean }> {
  const res = await fetch('/api-files/rename', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPath, newPath }),
  });
  if (!res.ok) {
    let errMsg = 'Failed to rename';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function deleteFile(filePath: string): Promise<{ success: boolean }> {
  const res = await fetch('/api-files/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: filePath }),
  });
  if (!res.ok) {
    let errMsg = 'Failed to delete';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function copyFile(srcPath: string, destPath: string): Promise<{ success: boolean }> {
  const res = await fetch('/api-files/copy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ srcPath, destPath }),
  });
  if (!res.ok) {
    let errMsg = 'Failed to copy';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }
  return res.json();
}
