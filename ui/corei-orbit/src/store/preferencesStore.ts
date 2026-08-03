// src/store/preferencesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { View, Tab } from './appStore';

interface PreferencesState {
  // Tabs
  tabs: Tab[];
  activeTabId: View | null;
  // Sidebar
  expandedFolders: Record<string, boolean>;
  // Strategy
  strategyName: string;
  // Terminal
  terminalAutoScroll: boolean;
  // Actions
  setTabs: (tabs: Tab[]) => void;
  setActiveTabId: (id: View | null) => void;
  setExpandedFolders: (folders: Record<string, boolean>) => void;
  setStrategyName: (name: string) => void;
  setTerminalAutoScroll: (value: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      tabs: [{ id: 'dashboard', label: 'Dashboard', icon: '📊' }],
      activeTabId: 'dashboard',
      expandedFolders: { strategies: false, marketData: false },
      strategyName: 'Mean Reversion',
      terminalAutoScroll: true,

      setTabs: (tabs) => set({ tabs }),
      setActiveTabId: (id) => set({ activeTabId: id }),
      setExpandedFolders: (folders) => set({ expandedFolders: folders }),
      setStrategyName: (name) => set({ strategyName: name }),
      setTerminalAutoScroll: (value) => set({ terminalAutoScroll: value }),
    }),
    {
      name: 'alpha-flow-preferences', // unique key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
