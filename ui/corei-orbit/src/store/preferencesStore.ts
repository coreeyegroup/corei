// src/store/preferencesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { View, Tab } from './appStore';

export type DomainId =
  | 'trading'
  | 'infrastructure'
  | 'risk'
  | 'market'
  | 'research'
  | 'portfolio'
  | 'corei-os'
  | 'executive'
  | 'compliance'
  | 'ai'
  | 'workspace'
  | 'operations'
  | 'data'
  | 'settings';

interface PreferencesState {
  tabs: Tab[];
  activeTabId: View | null;
  expandedFolders: Record<string, boolean>;
  strategyName: string;
  terminalAutoScroll: boolean;
  explorerCollapsed: boolean;
  openEditorsCollapsed: boolean;
  activeDomain: DomainId;

  setTabs: (tabs: Tab[]) => void;
  setActiveTabId: (id: View | null) => void;
  setExpandedFolders: (folders: Record<string, boolean>) => void;
  setStrategyName: (name: string) => void;
  setTerminalAutoScroll: (value: boolean) => void;
  setExplorerCollapsed: (collapsed: boolean) => void;
  setOpenEditorsCollapsed: (collapsed: boolean) => void;
  setActiveDomain: (domain: DomainId) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      tabs: [{ id: 'dashboard', label: 'Dashboard', icon: '📊' }],
      activeTabId: 'dashboard',
      expandedFolders: { strategies: false, marketData: false },
      strategyName: 'Mean Reversion',
      terminalAutoScroll: true,
      explorerCollapsed: false,
      openEditorsCollapsed: false,
      activeDomain: 'trading',

      setTabs: (tabs) => set({ tabs }),
      setActiveTabId: (id) => set({ activeTabId: id }),
      setExpandedFolders: (folders) => set({ expandedFolders: folders }),
      setStrategyName: (name) => set({ strategyName: name }),
      setTerminalAutoScroll: (value) => set({ terminalAutoScroll: value }),
      setExplorerCollapsed: (collapsed) => set({ explorerCollapsed: collapsed }),
      setOpenEditorsCollapsed: (collapsed) => set({ openEditorsCollapsed: collapsed }),
      setActiveDomain: (domain) => set({ activeDomain: domain }),
    }),
    {
      name: 'alpha-flow-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
