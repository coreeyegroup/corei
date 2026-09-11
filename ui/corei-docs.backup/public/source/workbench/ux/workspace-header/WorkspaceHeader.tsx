/**
 * COREI – Institutional Workspace Header
 * Stage-25 / Phase-19 / UX-09
 *
 * Command surface with workspace switcher, split controls, float button,
 * new window button, and actions.
 */
import React from 'react';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { SplitControls } from './SplitControls';
import { FloatControls } from './FloatControls';
import { NewWindowButton } from './NewWindowButton';
import { persistenceRuntime } from '../../workspace/persistence/runtime/persistence-runtime';
import './WorkspaceHeader.css';

export function WorkspaceHeader() {
  const handleSave = () => {
    persistenceRuntime.save();
    console.log('Layout saved.');
  };

  return (
    <header className="corei-workspace-header">
      <div className="corei-workspace-header-left">
        <div className="corei-workspace-name">Institutional Workspace</div>
        <div className="corei-workspace-subtitle">Default Workspace</div>
      </div>

      <div className="corei-workspace-header-right">
        <WorkspaceSwitcher />
        <SplitControls />
        <FloatControls />
        <NewWindowButton />
        <button className="corei-toolbar-button" onClick={handleSave}>Save</button>
        <button className="corei-toolbar-button">Open</button>
        <button className="corei-toolbar-button">New Workspace</button>
        <div className="corei-status-indicator">
          <span className="corei-status-dot"></span>
          Operational
        </div>
      </div>
    </header>
  );
}
