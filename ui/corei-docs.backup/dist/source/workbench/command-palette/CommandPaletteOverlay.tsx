/**
 * COREI – Command Palette Overlay
 * Stage-25 / Phase-21
 *
 * Renders the command palette as a modal overlay using a portal.
 * Triggered by Ctrl+Shift+P.
 */
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CommandPalette } from '../../command-center/components/CommandPalette';

export function CommandPaletteOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+P or Cmd+Shift+P
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        console.log('[CommandPalette] Toggled:', !isOpen);
      }
      // Escape closes
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="corei-command-palette-overlay">
      <div className="corei-command-palette-backdrop" onClick={() => setIsOpen(false)} />
      <div className="corei-command-palette-container">
        <CommandPalette />
      </div>
    </div>,
    document.body
  );
}
