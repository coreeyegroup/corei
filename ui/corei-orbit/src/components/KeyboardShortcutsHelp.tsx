// src/components/KeyboardShortcutsHelp.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Shortcut {
  key: string;
  description: string;
}

const SHORTCUTS: Shortcut[] = [
  { key: 'Ctrl+S', description: 'Save current file' },
  { key: 'Ctrl+B', description: 'Toggle sidebar' },
  { key: 'Ctrl+`', description: 'Toggle terminal' },
  { key: 'Ctrl+Shift+P', description: 'Open command palette' },
  { key: 'Ctrl+Shift+H', description: 'Show keyboard shortcuts' },
  { key: 'Ctrl+F', description: 'Search in terminal' },
  { key: 'Esc', description: 'Close modals / dialogs' },
];

const KeyboardShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay" onClick={() => setIsOpen(false)}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button className="shortcuts-close" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="shortcuts-list">
          {SHORTCUTS.map((shortcut) => (
            <div key={shortcut.key} className="shortcut-item">
              <span className="shortcut-key">{shortcut.key}</span>
              <span className="shortcut-desc">{shortcut.description}</span>
            </div>
          ))}
        </div>
        <div className="shortcuts-footer">
          Press <kbd>Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
