// src/components/Workspace/views/FileTree.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useFileStore } from '../../../store/fileStore';
import { listDirectory, createFile, createFolder, renameFile, deleteFile, copyFile } from '../../../services/fileService';
import type { FileItem } from '../../../services/fileService';
import {
  FileJson,
  FileCode,
  FileType,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileArchive,
  FileSpreadsheet,
  FileSearch,
  ChevronRight,
  ChevronDown,
  FilePlus,
  FolderPlus,
  Pencil,
  Trash2,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';

// ─── File icon mapper ────────────────────────────────────────────────────
const getFileIcon = (name: string, isDirectory: boolean) => {
  if (isDirectory) return null;

  const ext = name.split('.').pop()?.toLowerCase() || '';
  const props = { size: 14, className: 'file-icon' };

  const colorMap: Record<string, string> = {
    ts: '#2B7489',
    tsx: '#2B7489',
    js: '#F7DF1E',
    jsx: '#61DAFB',
    mjs: '#F7DF1E',
    cjs: '#F7DF1E',
    json: '#F1C40F',
    yaml: '#CBAD6E',
    yml: '#CBAD6E',
    css: '#563D7C',
    scss: '#C6538C',
    less: '#563D7C',
    html: '#E34F26',
    htm: '#E34F26',
    md: '#083FA1',
    txt: '#94A3B8',
    png: '#B2A3B5',
    jpg: '#B2A3B5',
    jpeg: '#B2A3B5',
    gif: '#B2A3B5',
    svg: '#B2A3B5',
    ico: '#B2A3B5',
    mp3: '#E67E22',
    wav: '#E67E22',
    flac: '#E67E22',
    mp4: '#E67E22',
    webm: '#E67E22',
    avi: '#E67E22',
    zip: '#7F8C8D',
    rar: '#7F8C8D',
    tar: '#7F8C8D',
    gz: '#7F8C8D',
    csv: '#27AE60',
    xlsx: '#27AE60',
    xls: '#27AE60',
    env: '#9B59B6',
    gitignore: '#7F8C8D',
  };

  const color = colorMap[ext] || '#94A3B8';
  const iconProps = { ...props, style: { color } };

  switch (ext) {
    case 'ts': case 'tsx': case 'js': case 'jsx': case 'mjs': case 'cjs':
      return <FileCode {...iconProps} />;
    case 'css': case 'scss': case 'less':
      return <FileType {...iconProps} />;
    case 'json': case 'yaml': case 'yml':
      return <FileJson {...iconProps} />;
    case 'md': case 'txt':
      return <FileText {...iconProps} />;
    case 'html': case 'htm':
      return <FileText {...iconProps} />;
    case 'png': case 'jpg': case 'jpeg': case 'gif': case 'svg': case 'ico':
      return <FileImage {...iconProps} />;
    case 'mp3': case 'wav': case 'flac':
      return <FileAudio {...iconProps} />;
    case 'mp4': case 'webm': case 'avi':
      return <FileVideo {...iconProps} />;
    case 'zip': case 'rar': case 'tar': case 'gz':
      return <FileArchive {...iconProps} />;
    case 'csv': case 'xlsx': case 'xls':
      return <FileSpreadsheet {...iconProps} />;
    case 'env': case 'gitignore':
      return <FileSearch {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

// ─── Context Menu ────────────────────────────────────────────────────────
interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  item: FileItem | null;
  onClose: () => void;
  onCreateFile: (item: FileItem) => void;
  onCreateFolder: (item: FileItem) => void;
  onRename: (item: FileItem) => void;
  onDelete: (item: FileItem) => void;
  onDuplicate: (item: FileItem) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  item,
  onClose,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
  onDuplicate,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [visible, onClose]);

  if (!visible || !item) return null;

  const menuX = Math.min(x, window.innerWidth - 200);
  const menuY = Math.min(y, window.innerHeight - 150);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: menuY,
        left: menuX,
        background: 'var(--bg-secondary, #0F151E)',
        border: '1px solid var(--border-color, #1F2937)',
        borderRadius: 4,
        padding: '4px 0',
        minWidth: '160px',
        zIndex: 1000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
      }}
    >
      {item.isDirectory && (
        <>
          <div
            className="context-menu-item"
            onClick={() => { onCreateFile(item); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <FilePlus size={14} /> New File
          </div>
          <div
            className="context-menu-item"
            onClick={() => { onCreateFolder(item); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <FolderPlus size={14} /> New Folder
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2px 8px' }} />
        </>
      )}
      <div
        className="context-menu-item"
        onClick={() => { onRename(item); onClose(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'var(--text-primary)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <Pencil size={14} /> Rename
      </div>
      <div
        className="context-menu-item"
        onClick={() => { onDuplicate(item); onClose(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'var(--text-primary)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <Copy size={14} /> Duplicate
      </div>
      <div style={{ borderTop: '1px solid var(--border-color)', margin: '2px 8px' }} />
      <div
        className="context-menu-item"
        onClick={() => { onDelete(item); onClose(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'var(--danger-red)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,77,77,0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <Trash2 size={14} /> Delete
      </div>
    </div>
  );
};

// ─── FileTree Item ───────────────────────────────────────────────────────
interface FileTreeItemProps {
  item: FileItem;
  depth: number;
  onContextMenu: (e: React.MouseEvent, item: FileItem) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ item, depth, onContextMenu }) => {
  const { expandedPaths, toggleExpand, openFile } = useFileStore();
  const [children, setChildren] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const isExpanded = expandedPaths.has(item.path);

  useEffect(() => {
    if (item.isDirectory && isExpanded) {
      setLoading(true);
      listDirectory(item.path)
        .then(res => {
          const sorted = res.items.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1;
            if (!a.isDirectory && b.isDirectory) return 1;
            return a.name.localeCompare(b.name);
          });
          setChildren(sorted);
        })
        .catch(() => setChildren([]))
        .finally(() => setLoading(false));
    }
  }, [item.isDirectory, isExpanded, item.path]);

  const handleToggle = () => {
    if (item.isDirectory) {
      toggleExpand(item.path);
    } else {
      openFile(item.path);
    }
  };

  const arrow = item.isDirectory ? (
    isExpanded ? <ChevronDown size={14} className="file-tree-arrow" /> : <ChevronRight size={14} className="file-tree-arrow" />
  ) : (
    <span className="file-tree-arrow-placeholder" />
  );

  const icon = !item.isDirectory ? getFileIcon(item.name, false) : null;

  const renderIndent = () => {
    const lines = [];
    for (let i = 0; i < depth; i++) {
      lines.push(<span key={i} className="tree-indent-line" />);
    }
    return lines;
  };

  return (
    <div>
      <div
        className="file-tree-item"
        onClick={handleToggle}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        {renderIndent()}
        {arrow}
        {icon}
        <span className="file-name">{item.name}</span>
        {loading && <span className="file-loading">⟳</span>}
      </div>
      {item.isDirectory && isExpanded && (
        <div>
          {children.map((child) => (
            <FileTreeItem
              key={child.path}
              item={child}
              depth={depth + 1}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main FileTree ───────────────────────────────────────────────────────
interface FileTreeProps {
  searchQuery?: string;
}

const FileTree: React.FC<FileTreeProps> = ({ searchQuery = '' }) => {
  const { tree, loadDirectory } = useFileStore();
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    item: FileItem | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const sortedTree = useMemo(() => {
    const sorted = [...tree].sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }, [tree]);

  const filterItems = (items: FileItem[], query: string): FileItem[] => {
    if (!query) return items;
    const lower = query.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(lower));
  };

  const filteredTree = filterItems(sortedTree, searchQuery);

  const handleContextMenu = (e: React.MouseEvent, item: FileItem) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      item,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  // ─── Actions ──────────────────────────────────────────────────────────
  const handleCreateFile = async (item: FileItem) => {
    const name = prompt('Enter file name:', 'new-file.txt');
    if (name) {
      const parentPath = item.isDirectory ? item.path : item.path.substring(0, item.path.lastIndexOf('/'));
      const fullPath = parentPath ? `${parentPath}/${name}` : name;
      try {
        await createFile(fullPath);
        toast.success(`File created: ${name}`);
        loadDirectory('');
      } catch (err: any) {
        toast.error(`Failed to create file: ${err.message}`);
      }
    }
  };

  const handleCreateFolder = async (item: FileItem) => {
    const name = prompt('Enter folder name:', 'new-folder');
    if (name) {
      const parentPath = item.isDirectory ? item.path : item.path.substring(0, item.path.lastIndexOf('/'));
      const fullPath = parentPath ? `${parentPath}/${name}` : name;
      try {
        await createFolder(fullPath);
        toast.success(`Folder created: ${name}`);
        loadDirectory('');
      } catch (err: any) {
        toast.error(`Failed to create folder: ${err.message}`);
      }
    }
  };

  const handleRename = async (item: FileItem) => {
    const newName = prompt('Enter new name:', item.name);
    if (newName && newName !== item.name) {
      const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
      const newPath = parentPath ? `${parentPath}/${newName}` : newName;
      try {
        await renameFile(item.path, newPath);
        toast.success(`Renamed to: ${newName}`);
        loadDirectory('');
      } catch (err: any) {
        toast.error(`Failed to rename: ${err.message}`);
      }
    }
  };

  const handleDelete = async (item: FileItem) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      try {
        await deleteFile(item.path);
        toast.success(`Deleted: ${item.name}`);
        loadDirectory('');
      } catch (err: any) {
        toast.error(`Failed to delete: ${err.message}`);
      }
    }
  };

  const handleDuplicate = async (item: FileItem) => {
    const ext = item.name.lastIndexOf('.');
    const base = ext > 0 ? item.name.substring(0, ext) : item.name;
    const suffix = ext > 0 ? item.name.substring(ext) : '';
    const newName = `${base}-copy${suffix}`;
    const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
    const newPath = parentPath ? `${parentPath}/${newName}` : newName;
    try {
      await copyFile(item.path, newPath);
      toast.success(`Duplicated: ${newName}`);
      loadDirectory('');
    } catch (err: any) {
      toast.error(`Failed to duplicate: ${err.message}`);
    }
  };

  return (
    <div className="file-tree" onContextMenu={(e) => e.preventDefault()}>
      {filteredTree.length === 0 ? (
        <div style={{ padding: '6px', color: 'var(--text-muted)' }}>
          {searchQuery ? 'No matches' : 'Loading...'}
        </div>
      ) : (
        filteredTree.map((item: FileItem) => (
          <FileTreeItem key={item.path} item={item} depth={0} onContextMenu={handleContextMenu} />
        ))
      )}
      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        item={contextMenu.item}
        onClose={closeContextMenu}
        onCreateFile={handleCreateFile}
        onCreateFolder={handleCreateFolder}
        onRename={handleRename}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />
    </div>
  );
};

export default FileTree;
