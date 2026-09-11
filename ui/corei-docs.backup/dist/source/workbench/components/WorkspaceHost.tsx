/**
 * COREI – Workspace Host (Phase‑19 UX‑03)
 * Stage-25 / Phase-19 / UX-03
 *
 * Institutional workspace container with header and the actual Dockview surface.
 * This replaces the empty workspace placeholder with the operational workspace.
 */
import React from 'react';
import { WorkspaceRoot } from '../ux/workspace-root';
import { WorkspaceCanvas } from '../ux/workspace-canvas';
import { WorkspaceHeader } from '../ux/workspace-header';
import { DockviewAdapter } from '../../foundation/workspace/adapters/dockview-adapter';

export function WorkspaceHost() {
  return (
    <WorkspaceRoot>
      <WorkspaceCanvas>
        <WorkspaceHeader />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <DockviewAdapter />
        </div>
      </WorkspaceCanvas>
    </WorkspaceRoot>
  );
}
