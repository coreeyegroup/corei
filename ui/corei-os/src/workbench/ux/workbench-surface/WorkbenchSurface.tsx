/**
 * COREI – Workbench Surface
 * Stage-25 / Phase-19 / UX-01
 *
 * The primary composition surface that holds either the empty workspace
 * or the docking surface placeholder. Initially we show the empty state.
 */
import React from 'react';
import { EmptyWorkspace } from '../empty-workspace';
import { DockSurface } from '../dock-surface';

export interface WorkbenchSurfaceProps {
  // Later we will pass workspace state; for now always show empty
  showEmpty?: boolean;
}

export function WorkbenchSurface({ showEmpty = true }: WorkbenchSurfaceProps) {
  return (
    <div className="corei-workspace-surface">
      {showEmpty ? <EmptyWorkspace /> : <DockSurface />}
    </div>
  );
}
