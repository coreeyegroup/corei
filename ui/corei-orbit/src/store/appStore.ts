// src/store/appStore.ts
import { create } from 'zustand';
import { usePreferencesStore } from './preferencesStore';

export type View = 'dashboard' | 'workflows' | 'scanner' | 'positions' | 'logs' | 'depth' | 'request';

export interface Tab {
  id: View;
  label: string;
  icon: string;
}

interface AppState {
  activeView: View; // kept for backward compatibility, but we use activeTabId
  setActiveView: (view: View) => void;
  expandedFolders: Record<string, boolean>;
  toggleFolder: (folder: string) => void;
  // Tabs
  tabs: Tab[];
  activeTabId: View | null;
  openTab: (view: View) => void;
  closeTab: (view: View) => void;
  setActiveTab: (view: View) => void;
}

// Map view to display info
const viewInfo: Record<View, { label: string; icon: string }> = {
  dashboard: { label: 'Dashboard', icon: '📊' },
  workflows: { label: 'Workflows', icon: '◈' },
  scanner: { label: 'Market Scanner', icon: '◉' },
  positions: { label: 'Positions', icon: '◘' },
  logs: { label: 'Execution Logs', icon: '⎚' },
  depth: { label: 'Depth Chart', icon: '📚' },
  request: { label: 'Request Builder', icon: '📨' },
};

// Load initial state from preferences
const initialPrefs = usePreferencesStore.getState();

export const useAppStore = create<AppState>((set, get) => ({
  activeView: 'dashboard',
  setActiveView: (view) => set({ activeView: view }),

  expandedFolders: initialPrefs.expandedFolders,
  toggleFolder: (folder) => {
    set((state) => {
      const newExpanded = {
        ...state.expandedFolders,
        [folder]: !state.expandedFolders[folder],
      };
      // Sync with preferences
      usePreferencesStore.getState().setExpandedFolders(newExpanded);
      return { expandedFolders: newExpanded };
    });
  },

  tabs: initialPrefs.tabs,
  activeTabId: initialPrefs.activeTabId,

  openTab: (view: View) => {
    const { tabs, activeTabId } = get();
    if (tabs.some((tab) => tab.id === view)) {
      set({ activeTabId: view });
      usePreferencesStore.getState().setActiveTabId(view);
      return;
    }
    const newTab: Tab = {
      id: view,
      label: viewInfo[view].label,
      icon: viewInfo[view].icon,
    };
    const newTabs = [...tabs, newTab];
    set({ tabs: newTabs, activeTabId: view });
    usePreferencesStore.getState().setTabs(newTabs);
    usePreferencesStore.getState().setActiveTabId(view);
  },

  closeTab: (view: View) => {
    const { tabs, activeTabId } = get();
    if (tabs.length === 1) return; // don't close last tab
    const newTabs = tabs.filter((tab) => tab.id !== view);
    let newActive = activeTabId;
    if (activeTabId === view) {
      const lastTab = newTabs[newTabs.length - 1];
      newActive = lastTab ? lastTab.id : null;
    }
    set({ tabs: newTabs, activeTabId: newActive });
    usePreferencesStore.getState().setTabs(newTabs);
    if (newActive) usePreferencesStore.getState().setActiveTabId(newActive);
  },

  setActiveTab: (view: View) => {
    set({ activeTabId: view });
    usePreferencesStore.getState().setActiveTabId(view);
  },
}));