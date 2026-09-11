/**
 * COREI – Float Controls
 * Stage-25 / Phase-19 / UX-08
 *
 * Provides a button to float the active panel.
 * Attempts several Dockview floating methods and falls back to opening a new panel.
 */
import React, { useState, useEffect } from 'react';
import { getDockviewApi } from '../../../foundation/workspace/dockview';
import { dockRuntime } from '../../docking/runtime/dock-runtime';
import './FloatControls.css';

export function FloatControls() {
  const [hasActivePanel, setHasActivePanel] = useState(false);

  useEffect(() => {
    const checkActive = () => {
      const api = getDockviewApi();
      if (!api) return;
      const group = api.activeGroup;
      setHasActivePanel(!!group && !!group.activePanel);
    };
    checkActive();
    // TODO: subscribe to panel changes
  }, []);

  const handleFloat = () => {
    const api = getDockviewApi();
    if (!api) {
      console.warn('Dockview API not available.');
      return;
    }

    const activeGroup = api.activeGroup;
    if (!activeGroup) {
      console.warn('No active group to float.');
      return;
    }

    const activePanel = activeGroup.activePanel;
    if (!activePanel) {
      console.warn('No active panel to float.');
      return;
    }

    // Try various floating methods
    let floated = false;

    // Method 1: addPanel with floating flag (if supported)
    try {
      // @ts-ignore - we are testing for a floating property
      if (api.addPanel && typeof api.addPanel === 'function') {
        // Try to add a floating panel by specifying floating: true
        // This is not standard but some versions might support it.
        const panelId = `float-${Date.now()}`;
        // @ts-ignore - we are testing
        api.addPanel({
          id: panelId,
          component: 'welcome',
          title: 'Floating Panel',
          floating: true,
        });
        console.log('Floating panel added (floating: true)');
        floated = true;
      }
    } catch (e) {
      console.warn('Method 1 failed:', e);
    }

    // Method 2: try api.floatGroup (if exists)
    if (!floated) {
      try {
        if (typeof (api as any).floatGroup === 'function') {
          (api as any).floatGroup(activeGroup);
          console.log('Floating group via floatGroup');
          floated = true;
        }
      } catch (e) {
        console.warn('Method 2 failed:', e);
      }
    }

    // Method 3: try activeGroup.api.float()
    if (!floated) {
      try {
        if (activeGroup.api && typeof (activeGroup.api as any).float === 'function') {
          (activeGroup.api as any).float();
          console.log('Floating group via group.api.float()');
          floated = true;
        }
      } catch (e) {
        console.warn('Method 3 failed:', e);
      }
    }

    // Method 4: try api.floatPanel(activePanel)
    if (!floated) {
      try {
        if (typeof (api as any).floatPanel === 'function') {
          (api as any).floatPanel(activePanel);
          console.log('Floating panel via floatPanel');
          floated = true;
        }
      } catch (e) {
        console.warn('Method 4 failed:', e);
      }
    }

    // Method 5: try api.popoutPanel? (some versions)
    if (!floated) {
      try {
        if (typeof (api as any).popoutPanel === 'function') {
          (api as any).popoutPanel(activePanel);
          console.log('Floating panel via popoutPanel');
          floated = true;
        }
      } catch (e) {
        console.warn('Method 5 failed:', e);
      }
    }

    // Fallback: open a new panel in a new group (not floating)
    if (!floated) {
      console.warn('All floating methods failed. Adding a new panel in a new group.');
      dockRuntime.openPanel('welcome');
    }
  };

  return (
    <div className="corei-float-controls">
      <button
        className="corei-toolbar-button"
        onClick={handleFloat}
        disabled={!hasActivePanel}
      >
        Float
      </button>
    </div>
  );
}
