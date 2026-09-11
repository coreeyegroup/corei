import { create } from 'zustand';
import type { WorkspaceTab } from '../types';

interface AppState {
  openTabs: WorkspaceTab[];
  activeTabId: string | null;
  selectedDocumentId: string | null;

  openDocument: (doc: { id: string; title: string }) => void;
  setActiveTab: (id: string) => void;
  closeTab: (id: string) => void;
  selectDocument: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  openTabs: [],
  activeTabId: null,
  selectedDocumentId: null,

  openDocument: (doc) => {
    const exists = get().openTabs.find(tab => tab.documentId === doc.id);
    if (!exists) {
      const newTab: WorkspaceTab = { id: doc.id, documentId: doc.id, title: doc.title };
      set(state => ({ openTabs: [...state.openTabs, newTab], activeTabId: doc.id, selectedDocumentId: doc.id }));
    } else {
      set({ activeTabId: doc.id, selectedDocumentId: doc.id });
    }
  },

  setActiveTab: (id) => set({ activeTabId: id, selectedDocumentId: id }),
  closeTab: (id) => set(state => ({ openTabs: state.openTabs.filter(t => t.id !== id) })),
  selectDocument: (id) => set({ selectedDocumentId: id })
}));
