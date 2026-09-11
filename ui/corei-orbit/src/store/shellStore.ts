// src/store/shellStore.ts
import { create } from 'zustand';

interface ShellState {
  organization: string;
  workspace: string;
  environment: string;
  operator: string;
  setOrganization: (org: string) => void;
  setWorkspace: (ws: string) => void;
}

export const useShellStore = create<ShellState>((set) => ({
  organization: 'COREI Institutional',
  workspace: 'default',
  environment: import.meta.env.MODE?.toUpperCase() || 'DEVELOPMENT',
  operator: 'Operator',
  setOrganization: (org) => set({ organization: org }),
  setWorkspace: (ws) => set({ workspace: ws }),
}));
