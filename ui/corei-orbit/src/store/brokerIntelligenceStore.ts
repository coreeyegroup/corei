import { create } from 'zustand';
import type {
  BrokerProvider,
  BrokerAccount,
  BrokerCredential,
  ExecutionRoute,
  DiagnosticEvent,
  AuditEvent
} from '../types/brokerIntelligence';

interface BrokerIntelligenceState {
  providers: BrokerProvider[];
  accounts: BrokerAccount[];
  credentials: BrokerCredential[];
  routes: ExecutionRoute[];
  diagnostics: DiagnosticEvent[];
  audits: AuditEvent[];
  loading: boolean;
  error: string | null;
  lastRefresh: number | null;

  setProviders: (providers: BrokerProvider[]) => void;
  setAccounts: (accounts: BrokerAccount[]) => void;
  setCredentials: (credentials: BrokerCredential[]) => void;
  setRoutes: (routes: ExecutionRoute[]) => void;
  setDiagnostics: (diagnostics: DiagnosticEvent[]) => void;
  setAudits: (audits: AuditEvent[]) => void;

  updateProvider: (id: string, patch: Partial<BrokerProvider>) => void;
  updateAccount: (id: string, patch: Partial<BrokerAccount>) => void;
  updateCredential: (id: string, patch: Partial<BrokerCredential>) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastRefresh: (timestamp: number) => void;
}

export const useBrokerIntelligenceStore = create<BrokerIntelligenceState>((set) => ({
  providers: [],
  accounts: [],
  credentials: [],
  routes: [],
  diagnostics: [],
  audits: [],
  loading: false,
  error: null,
  lastRefresh: null,

  setProviders: (providers) => set({ providers }),
  setAccounts: (accounts) => set({ accounts }),
  setCredentials: (credentials) => set({ credentials }),
  setRoutes: (routes) => set({ routes }),
  setDiagnostics: (diagnostics) => set({ diagnostics }),
  setAudits: (audits) => set({ audits }),

  updateProvider: (id, patch) =>
    set((state) => ({
      providers: state.providers.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  updateAccount: (id, patch) =>
    set((state) => ({
      accounts: state.accounts.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    })),
  updateCredential: (id, patch) =>
    set((state) => ({
      credentials: state.credentials.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLastRefresh: (lastRefresh) => set({ lastRefresh }),
}));
