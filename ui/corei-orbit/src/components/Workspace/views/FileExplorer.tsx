// src/components/Workspace/views/FileExplorer.tsx
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useFileStore } from '../../../store/fileStore';
import FileTree from './FileTree';
import FileEditor from './FileEditor';
import './FileExplorer.css';

const MIN_WIDTH = 120;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 260;

const FileExplorer: React.FC = () => {
  const {
    loadDirectory,
    error,
    openFiles,
    activeFilePath,
    setActiveFile,
    closeFile,
    saveFile,
    setDirty,
  } = useFileStore();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem('fileExplorerCollapsed');
    return stored === 'true';
  });

  const [panelWidth, setPanelWidth] = useState(() => {
    const stored = localStorage.getItem('fileExplorerWidth');
    return stored ? parseInt(stored, 10) : DEFAULT_WIDTH;
  });

  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(panelWidth);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('fileExplorerWidth', String(panelWidth));
  }, [panelWidth]);

  useEffect(() => {
    localStorage.setItem('fileExplorerCollapsed', String(isCollapsed));
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const delta = e.clientX - startXRef.current;
      let newWidth = startWidthRef.current + delta;
      newWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
      setPanelWidth(newWidth);
    };

    const handleResizeEnd = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  useEffect(() => {
    loadDirectory('');
  }, []);

  const activeFile = openFiles.find((f) => f.path === activeFilePath);

  // ─── Memoized callbacks for FileEditor ──────────────────────────────
  const handleContentChange = useCallback(
    (_content: string) => {
      if (activeFilePath) {
        setDirty(activeFilePath, true);
      }
    },
    [activeFilePath, setDirty]
  );

  const handleSave = useCallback(
    (content: string) => {
      if (activeFilePath) {
        saveFile(activeFilePath, content);
      }
    },
    [activeFilePath, saveFile]
  );

  // Close handler for Open Editors
  const handleCloseFile = (path: string) => {
    const file = openFiles.find((f) => f.path === path);
    if (file?.isDirty) {
      if (!window.confirm(`Close "${path}" without saving?`)) return;
    }
    closeFile(path);
  };

  const currentWidth = isCollapsed ? 40 : panelWidth;

  // Tab bar close handler
  const handleTabClose = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    const file = openFiles.find((f) => f.path === path);
    if (file?.isDirty) {
      if (!window.confirm(`Close "${path}" without saving?`)) return;
    }
    closeFile(path);
  };

  // Memoize active editor
  const activeEditor = useMemo(() => {
    if (activeFile) {
      return (
        <FileEditor
          key={activeFile.path}
          filePath={activeFile.path}
          language={activeFile.language}
          initialContent={activeFile.content}
          onContentChange={handleContentChange}
          onSave={handleSave}
        />
      );
    }
    return <div className="file-editor-placeholder">📄 Select a file from the explorer</div>;
  }, [activeFile, handleContentChange, handleSave]);

  return (
    <div className="file-explorer">
      {error && <div className="file-error">{error}</div>}
      <div className="file-explorer-body">
        {/* File Tree Panel */}
        <div
          className={`file-tree-panel ${isCollapsed ? 'collapsed' : ''}`}
          style={{ width: currentWidth }}
        >
          <div className="file-tree-header">
            {!isCollapsed && <span className="file-tree-header-title">EXPLORER</span>}
            <button
              className="file-tree-toggle"
              onClick={toggleCollapse}
              title={isCollapsed ? 'Expand explorer' : 'Collapse explorer'}
            >
              {isCollapsed ? '>' : '<'}
            </button>
          </div>

          {!isCollapsed && (
            <>
              <div className="file-tree-search">
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="file-search-input"
                />
              </div>

              {openFiles.length > 0 && (
                <div className="open-editors">
                  <div className="open-editors-header">Open Editors</div>
                  {openFiles.map((file) => (
                    <div
                      key={file.path}
                      className={`open-editor-item ${activeFilePath === file.path ? 'active' : ''}`}
                      onClick={() => setActiveFile(file.path)}
                    >
                      <span className="open-editor-name">{file.path}</span>
                      {file.isDirty && <span className="open-editor-dirty">●</span>}
                      <button
                        className="open-editor-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseFile(file.path);
                        }}
                        title="Close"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FileTree searchQuery={searchQuery} />
            </>
          )}
        </div>

        {/* Resize Handle */}
        {!isCollapsed && (
          <div
            className="file-tree-resize-handle"
            onMouseDown={handleResizeStart}
            title="Drag to resize"
          />
        )}

        {/* Editor Panel */}
        <div className="file-editor-panel">
          {/* File Tab Bar */}
          {openFiles.length > 0 && (
            <div className="file-tab-bar">
              {openFiles.map((file) => (
                <div
                  key={file.path}
                  className={`file-tab-item ${activeFilePath === file.path ? 'active' : ''}`}
                  onClick={() => setActiveFile(file.path)}
                >
                  <span className="file-tab-label">{file.path}</span>
                  {file.isDirty && <span className="file-tab-dirty">●</span>}
                  <button
                    className="file-tab-close"
                    onClick={(e) => handleTabClose(e, file.path)}
                    title="Close tab"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeEditor}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
