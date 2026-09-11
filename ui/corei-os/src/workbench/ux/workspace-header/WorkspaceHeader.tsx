/**
 * COREI – Institutional Workspace Header
 * Stage-25 / Phase-19 / UX-02
 *
 * Institutional workspace chrome and visual command surface.
 *
 * This step owns presentation only.
 * Command behavior is introduced by later Phase-19 UX steps.
 */

import React from 'react';
import './WorkspaceHeader.css';

export function WorkspaceHeader(): React.JSX.Element {
  return (
    <header className="corei-workspace-header">

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div className="corei-workspace-title">

          <div className="corei-workspace-name">
            Institutional Workspace
          </div>

          <div className="corei-workspace-subtitle">
            Default Workspace
          </div>

        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >

        <button
          className="corei-toolbar-button"
          type="button"
        >
          New Workspace
        </button>

        <button
          className="corei-toolbar-button"
          type="button"
        >
          Open
        </button>

        <button
          className="corei-toolbar-button"
          type="button"
        >
          Save
        </button>

        <button
          className="corei-toolbar-button"
          type="button"
        >
          Layout
        </button>

        <div
          style={{
            width: 1,
            height: 20,
            background: '#3b4048',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#9ecb5d',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.8px',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#69d05f',
            }}
          />

          Operational
        </div>

      </div>

    </header>
  );
}
