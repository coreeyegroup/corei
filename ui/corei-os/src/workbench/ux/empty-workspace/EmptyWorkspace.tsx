/**
 * COREI – Empty Workspace
 * Stage-25 / Phase-19 / UX-01
 *
 * Professional empty state when no workspace is open.
 * No cards, no dashboards – only institutional messaging.
 */
import React from 'react';

export function EmptyWorkspace() {
  return (
    <div className="corei-empty-workspace">
      <div className="corei-empty-workspace-icon">⬡</div>
      <div className="corei-empty-workspace-title">Institutional Workspace</div>
      <div className="corei-empty-workspace-subtitle">
        No active workspace. Open or create a workspace to begin operating.
      </div>
    </div>
  );
}
