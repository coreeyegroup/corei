/**
 * COREI – Workspace Switcher
 * Stage-25 / Phase-19 / UX-07
 *
 * Dropdown to switch between registered workspaces.
 * Consumes the workspace runtime.
 */
import React, { useState, useEffect } from 'react';
import { workspaceRuntime } from '../../workspace/runtime/workspace-runtime';
import './WorkspaceSwitcher.css';

export function WorkspaceSwitcher() {
  const [workspaces, setWorkspaces] = useState<string[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      // workspaceRuntime.list() returns WorkspaceLayout[] with `id` property
      const list = workspaceRuntime.list().map((w: any) => w.id);
      setWorkspaces(list);
      const current = workspaceRuntime.current();
      setActiveWorkspace(current);
    };
    load();
    // TODO: subscribe to workspace changes
  }, []);

  const switchWorkspace = (id: string) => {
    workspaceRuntime.open(id);
    setActiveWorkspace(id);
  };

  return (
    <div className="corei-workspace-switcher">
      <select
        value={activeWorkspace || ''}
        onChange={(e) => switchWorkspace(e.target.value)}
        className="corei-workspace-select"
      >
        {workspaces.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  );
}
