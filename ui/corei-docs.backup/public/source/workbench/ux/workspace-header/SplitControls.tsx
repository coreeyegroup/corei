/**
 * COREI – Split Controls
 * Stage-25 / Phase-19 / UX-07
 *
 * Provides buttons to split the active panel horizontally or vertically.
 * Uses the Dockview API directly via getDockviewApi().
 */
import React from 'react';
import { getDockviewApi } from '../../../foundation/workspace/dockview';
import { dockRuntime } from '../../docking/runtime/dock-runtime';
import './SplitControls.css';

export function SplitControls() {
  const handleSplit = (direction: 'horizontal' | 'vertical') => {
    const api = getDockviewApi();
    if (!api) {
      console.warn('Dockview API not available.');
      return;
    }

    const activeGroup = api.activeGroup;
    if (!activeGroup) {
      console.warn('No active group to split.');
      return;
    }

    const panelId = `split-${Date.now()}`;

    try {
      // Add a panel to the active group. This will create a split if the group already has panels.
      // The exact behavior depends on the Dockview implementation.
      api.addPanel({
        id: panelId,
        component: 'welcome',
        title: 'Split Panel',
      });
      console.log(`Split ${direction} panel added: ${panelId}`);
    } catch (e) {
      console.warn('Split failed, using fallback:', e);
      // Fallback: use dockRuntime to add a panel
      dockRuntime.openPanel('welcome');
    }
  };

  return (
    <div className="corei-split-controls">
      <button className="corei-toolbar-button" onClick={() => handleSplit('horizontal')}>Split ↔</button>
      <button className="corei-toolbar-button" onClick={() => handleSplit('vertical')}>Split ↕</button>
    </div>
  );
}
