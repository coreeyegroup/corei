/**
 * COREI – Institutional Workspace Root
 * Stage-25 / Phase-19 / UX-01
 *
 * The top‑level container for the entire workspace area.
 * It provides the institutional background and spacing.
 */
import React from 'react';
import '../foundation/workspace-foundation.css';

export interface WorkspaceRootProps {
  children: React.ReactNode;
}

export function WorkspaceRoot({ children }: WorkspaceRootProps) {
  return (
    <div className="corei-workspace-root">
      {children}
    </div>
  );
}
