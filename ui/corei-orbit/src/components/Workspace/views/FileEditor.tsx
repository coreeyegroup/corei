// src/components/Workspace/views/FileEditor.tsx
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { useFileStore } from '../../../store/fileStore';

const MIN_PREVIEW_WIDTH = 150;
const MAX_PREVIEW_WIDTH = 800;
const SAVED_INDICATOR_DELAY = 2000;

interface Props {
  filePath: string;
  language: string;
  initialContent: string;
  onContentChange: (content: string) => void;
  onSave: (content: string) => void;
}

const FileEditor: React.FC<Props> = React.memo(
  ({ filePath, language, initialContent, onContentChange, onSave }) => {
    const editorRef = useRef<any>(null);
    const { closeFile } = useFileStore();
    const [showPreview, setShowPreview] = useState(false);
    const [previewWidth, setPreviewWidth] = useState(() => {
      const stored = localStorage.getItem('previewWidth');
      return stored ? parseInt(stored, 10) : 400;
    });
    const [previewZoom, setPreviewZoom] = useState(() => {
      const stored = localStorage.getItem('previewZoom');
      return stored ? parseFloat(stored) : 1.0;
    });
    const [isResizing, setIsResizing] = useState(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(previewWidth);
    const rafRef = useRef<number | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentContentRef = useRef<string>(initialContent);
    const onContentChangeRef = useRef(onContentChange);
    const onSaveRef = useRef(onSave);

    // ─── Search state ──────────────────────────────────────────────────
    const searchQueryRef = useRef<string>('');
    const matchIndexRef = useRef<number>(0);
    const matchesRef = useRef<any[]>([]);
    const decorationIdsRef = useRef<string[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      onContentChangeRef.current = onContentChange;
      onSaveRef.current = onSave;
    }, [onContentChange, onSave]);

    useEffect(() => {
      localStorage.setItem('previewWidth', String(previewWidth));
    }, [previewWidth]);

    useEffect(() => {
      localStorage.setItem('previewZoom', String(previewZoom));
    }, [previewZoom]);

    const handleSave = useCallback(() => {
      if (isSaving) return;
      const content = currentContentRef.current;
      setIsSaving(true);
      onSaveRef.current(content);
      setTimeout(() => {
        setIsSaving(false);
        setShowSaved(true);
        if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
        savedTimeoutRef.current = setTimeout(() => {
          setShowSaved(false);
        }, SAVED_INDICATOR_DELAY);
      }, 300);
    }, [isSaving]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          handleSave();
        }
        if (e.key === 'Escape' && searchInputRef.current) {
          searchInputRef.current.blur();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSave]);

    const handleEditorDidMount = (editor: any) => {
      editorRef.current = editor;
    };

    const handleClose = useCallback(() => {
      if (currentContentRef.current !== initialContent) {
        if (!window.confirm(`File "${filePath}" has unsaved changes. Close anyway?`)) {
          return;
        }
      }
      closeFile(filePath);
    }, [filePath, initialContent, closeFile]);

    const togglePreview = useCallback(() => {
      setShowPreview((prev) => !prev);
    }, []);

    // ─── Search functions ──────────────────────────────────────────────
    const updateDecorations = useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const matches = matchesRef.current;
      if (matches.length === 0) {
        decorationIdsRef.current = editor.deltaDecorations(decorationIdsRef.current, []);
        return;
      }
      const decorations = matches.map((match: any, idx: number) => ({
        range: match.range,
        options: {
          className: idx === matchIndexRef.current ? 'search-match-current' : 'search-match',
          stickiness: 1,
        },
      }));
      decorationIdsRef.current = editor.deltaDecorations(decorationIdsRef.current, decorations);
    }, []);

    const performSearch = useCallback((query: string) => {
      const editor = editorRef.current;
      if (!editor || !query) {
        matchesRef.current = [];
        matchIndexRef.current = 0;
        updateDecorations();
        return;
      }
      const model = editor.getModel();
      if (!model) return;

      const matches = model.findMatches(query, true, false, false, null, true);
      matchesRef.current = matches;
      if (matches.length > 0) {
        matchIndexRef.current = 0;
        const firstMatch = matches[0];
        editor.setSelection(firstMatch.range);
        editor.revealRangeInCenter(firstMatch.range);
        updateDecorations();
      } else {
        matchIndexRef.current = 0;
        updateDecorations();
      }
    }, [updateDecorations]);

    const navigate = useCallback((direction: 'next' | 'prev') => {
      const matches = matchesRef.current;
      if (matches.length === 0) return;
      let newIndex = matchIndexRef.current;
      if (direction === 'next') {
        newIndex = (newIndex + 1) % matches.length;
      } else {
        newIndex = (newIndex - 1 + matches.length) % matches.length;
      }
      matchIndexRef.current = newIndex;
      const match = matches[newIndex];
      if (match) {
        const editor = editorRef.current;
        if (editor) {
          editor.setSelection(match.range);
          editor.revealRangeInCenter(match.range);
        }
        updateDecorations();
      }
    }, [updateDecorations]);

    const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      searchQueryRef.current = query;
      performSearch(query);
    }, [performSearch]);

    const handleSearchNext = useCallback(() => navigate('next'), [navigate]);
    const handleSearchPrev = useCallback(() => navigate('prev'), [navigate]);

    // ─── Focus search on Ctrl+F ──────────────────────────────────────
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
          e.preventDefault();
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // ─── Resize handlers ──────────────────────────────────────────────
    const handleResizeStart = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = previewWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    };

    useEffect(() => {
      const handleResizeMove = (e: MouseEvent) => {
        if (!isResizing) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const delta = -(e.clientX - startXRef.current);
          let newWidth = startWidthRef.current + delta;
          newWidth = Math.min(Math.max(newWidth, MIN_PREVIEW_WIDTH), MAX_PREVIEW_WIDTH);
          setPreviewWidth(newWidth);
        });
      };

      const handleResizeEnd = () => {
        if (isResizing) {
          setIsResizing(false);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
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

    const increaseZoom = useCallback(() => {
      if (showPreview) {
        setPreviewZoom(Math.min(previewZoom + 0.1, 2.0));
      }
    }, [previewZoom, showPreview]);

    const decreaseZoom = useCallback(() => {
      if (showPreview) {
        setPreviewZoom(Math.max(previewZoom - 0.1, 0.5));
      }
    }, [previewZoom, showPreview]);

    const renderStatusIndicator = useCallback(() => {
      const isDirty = currentContentRef.current !== initialContent;
      if (isSaving) return <span className="file-editor-status saving">⏳</span>;
      if (showSaved) return <span className="file-editor-status saved">✓</span>;
      if (isDirty) return <span className="file-editor-status dirty">●</span>;
      return null;
    }, [isSaving, showSaved, initialContent]);

    const editorOptions = useMemo(
      () => ({
        minimap: { enabled: false },
        fontSize: 12,
        fontFamily: 'monospace',
        lineNumbers: 'on' as const,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }),
      []
    );

    const handleContentChange = useCallback(
      (value: string | undefined) => {
        const content = value || '';
        currentContentRef.current = content;
        onContentChangeRef.current(content);
        if (searchQueryRef.current) {
          performSearch(searchQueryRef.current);
        }
      },
      [performSearch]
    );

    const isHtml = filePath.endsWith('.html') || filePath.endsWith('.htm');
    const zoomDisabled = !showPreview;

    const matchCount = matchesRef.current.length;
    const currentIndex = matchIndexRef.current;

    return (
      <div className="file-editor-container" key={filePath}>
        <div className="file-editor-header">
          <button className="file-editor-save" onClick={handleSave} title="Save (Ctrl+S)">
            💾
          </button>
          <span className="file-editor-tab">{filePath}</span>
          {renderStatusIndicator()}
          <div style={{ flex: 1 }} />

          <div className="search-bar">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="search-input"
              onChange={handleSearchInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.shiftKey ? handleSearchPrev() : handleSearchNext();
                }
              }}
            />
            <span className="search-count">
              {matchCount > 0 ? `${currentIndex + 1}/${matchCount}` : matchCount === 0 && searchQueryRef.current ? '0' : ''}
            </span>
            <button className="search-btn" onClick={handleSearchPrev} title="Previous (Shift+Enter)">▲</button>
            <button className="search-btn" onClick={handleSearchNext} title="Next (Enter)">▼</button>
          </div>

          <div style={{ marginRight: 6 }} />

          {isHtml && (
            <button
              className={`file-editor-preview-btn ${showPreview ? 'active' : ''}`}
              onClick={togglePreview}
              title={showPreview ? 'Hide preview' : 'Show preview'}
            >
              {showPreview ? 'Hide HTML' : 'Preview HTML'}
            </button>
          )}

          <div className="preview-zoom-controls">
            <button
              onClick={decreaseZoom}
              disabled={zoomDisabled}
              title={zoomDisabled ? 'Enable preview to zoom' : 'Zoom out'}
            >
              A-
            </button>
            <span>{Math.round(previewZoom * 100)}%</span>
            <button
              onClick={increaseZoom}
              disabled={zoomDisabled}
              title={zoomDisabled ? 'Enable preview to zoom' : 'Zoom in'}
            >
              A+
            </button>
          </div>

          <button className="file-editor-close" onClick={handleClose} title="Close file">
            ✕
          </button>
        </div>

        <div className={`file-editor-body ${showPreview ? 'split' : ''}`}>
          <div className="file-editor-wrapper">
            <Editor
              height="100%"
              language={language}
              defaultValue={initialContent}
              onChange={handleContentChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={editorOptions}
            />
          </div>

          {showPreview && isHtml && (
            <div
              className="file-editor-preview-wrapper"
              style={{ width: previewWidth, willChange: 'width' }}
            >
              <div
                className="file-editor-preview-resize-handle"
                onMouseDown={handleResizeStart}
                title="Drag to resize preview"
              />
              <div className="file-editor-preview">
                <div
                  className="preview-content"
                  style={{
                    transform: `scale(${previewZoom})`,
                    transformOrigin: 'top left',
                    width: `${100 / previewZoom}%`,
                    height: `${100 / previewZoom}%`,
                  }}
                >
                  <iframe
                    srcDoc={currentContentRef.current}
                    sandbox="allow-scripts allow-modals"
                    title="HTML Preview"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.filePath === nextProps.filePath &&
      prevProps.language === nextProps.language &&
      prevProps.initialContent === nextProps.initialContent
    );
  }
);

FileEditor.displayName = 'FileEditor';

export default FileEditor;
