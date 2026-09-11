/**
 * COREI – Institutional Workspace Canvas
 * Stage-25 / Phase-19 / UX-01
 *
 * The main work area surface with padding and border.
 */
import React from 'react';

export interface WorkspaceCanvasProps {
  children: React.ReactNode;
}

export function WorkspaceCanvas({ children }: WorkspaceCanvasProps) {
  return (
    <div className="corei-workspace-canvas">
      {children}
    </div>
  );
}
