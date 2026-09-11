// src/store/appStore.ts
import { create } from 'zustand';
import { usePreferencesStore } from './preferencesStore';

export type View = string;

export interface Tab {
  id: View;
  label: string;
  icon: string;
}

interface AppState {
  activeView: View;
  setActiveView: (view: View) => void;
  expandedFolders: Record<string, boolean>;
  toggleFolder: (folder: string) => void;
  tabs: Tab[];
  activeTabId: View | null;
  openTab: (view: View, label?: string, icon?: string) => void;
  closeTab: (view: View) => void;
  setActiveTab: (view: View) => void;
  reorderTabs: (newTabs: Tab[]) => void; // NEW
}

const viewInfo: Record<string, { label: string; icon: string }> = {
  dashboard: { label: 'Dashboard', icon: '📊' },
  workflows: { label: 'Workflows', icon: '◈' },
  scanner: { label: 'Market Scanner', icon: '◉' },
  positions: { label: 'Positions', icon: '◘' },
  logs: { label: 'Execution Logs', icon: '⎚' },
  depth: { label: 'Depth Chart', icon: '📚' },
  request: { label: 'Request Builder', icon: '📨' },
  files: { label: 'Documents', icon: '📁' },
};

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
      usePreferencesStore.getState().setExpandedFolders(newExpanded);
      return { expandedFolders: newExpanded };
    });
  },

  tabs: initialPrefs.tabs,
  activeTabId: initialPrefs.activeTabId,

  openTab: (view: View, label?: string, icon?: string) => {
    const { tabs } = get();
    if (tabs.some((tab) => tab.id === view)) {
      set({ activeTabId: view });
      usePreferencesStore.getState().setActiveTabId(view);
      return;
    }
    const defaultInfo = viewInfo[view];
    const newLabel = label || defaultInfo?.label || view;
    const newIcon = icon || defaultInfo?.icon || '🖥️';
    const newTab: Tab = { id: view, label: newLabel, icon: newIcon };
    const newTabs = [...tabs, newTab];
    set({ tabs: newTabs, activeTabId: view });
    usePreferencesStore.getState().setTabs(newTabs);
    usePreferencesStore.getState().setActiveTabId(view);
  },

  closeTab: (view: View) => {
    const { tabs, activeTabId } = get();
    if (tabs.length === 1) return;
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

  // ─── NEW: reorder tabs ──────────────────────────────────────────────
  reorderTabs: (newTabs) => {
    set({ tabs: newTabs });
    usePreferencesStore.getState().setTabs(newTabs);
  },
}));
