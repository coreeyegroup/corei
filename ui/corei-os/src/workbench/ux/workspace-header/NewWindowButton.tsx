/**
 * COREI – New Window Button
 * Stage-25 / Phase-19 / UX-09
 *
 * Opens a new browser window with the current workspace.
 */
import React from 'react';
import { workspaceRuntime } from '../../workspace/runtime/workspace-runtime';

export function NewWindowButton() {
  const handleNewWindow = () => {
    const currentWorkspaceId = workspaceRuntime.current();
    const url = new URL(window.location.href);
    if (currentWorkspaceId) {
      url.searchParams.set('workspace', currentWorkspaceId);
    } else {
      url.searchParams.delete('workspace');
    }
    window.open(url.toString(), '_blank');
  };

  return (
    <button className="corei-toolbar-button" onClick={handleNewWindow}>
      New Window
    </button>
  );
}
