import { create } from 'zustand';
import type { FixSessionConfig, FixSessionMetrics, FixLogEntry, ConnectivitySettings, BrokerHealthScore } from '../types/brokerConnectivity';

interface BrokerConnectivityState {
  configs: Record<string, FixSessionConfig>;
  metrics: Record<string, FixSessionMetrics>;
  logs: FixLogEntry[];
  healthScores: Record<string, BrokerHealthScore>;
  settings: ConnectivitySettings;
  selectedBrokerId: string;
  logFilter: 'ALL' | 'INBOUND' | 'OUTBOUND' | 'SYSTEM';

  setMetrics: (metric: FixSessionMetrics) => void;
  addLog: (log: FixLogEntry) => void;
  updateSettings: (settings: Partial<ConnectivitySettings>) => void;
  updateConfig: (config: FixSessionConfig) => void;
  setSelectedBroker: (brokerId: string) => void;
  setLogFilter: (filter: 'ALL' | 'INBOUND' | 'OUTBOUND' | 'SYSTEM') => void;
  setHealthScore: (score: BrokerHealthScore) => void;
}

export const useBrokerConnectivityStore = create<BrokerConnectivityState>((set) => ({
  configs: {
    BrokerA: { brokerId: 'BrokerA', host: 'fix.brokerA.com', port: 9876, ssl: true, fixVersion: 'FIX.4.4', senderCompId: 'COREI', targetCompId: 'BROKER_A', heartbeatIntervalSec: 30, reconnectAttempts: 10, socketBufferKB: 512, tcpNoDelay: true, privateIp: '10.1.1.10' },
    BrokerB: { brokerId: 'BrokerB', host: 'fix.brokerB.com', port: 9977, ssl: true, fixVersion: 'FIX.4.4', senderCompId: 'COREI', targetCompId: 'BROKER_B', heartbeatIntervalSec: 30, reconnectAttempts: 5, socketBufferKB: 256, tcpNoDelay: true, privateIp: '10.1.1.11' },
    BrokerC: { brokerId: 'BrokerC', host: 'fix.brokerC.com', port: 9988, ssl: false, fixVersion: 'FIX.4.2', senderCompId: 'COREI', targetCompId: 'BROKER_C', heartbeatIntervalSec: 15, reconnectAttempts: 3, socketBufferKB: 128, tcpNoDelay: false, privateIp: '10.1.1.12' },
  },
  metrics: {},
  logs: [],
  healthScores: {},
  settings: { autoReconnect: true, usePrimaryOnly: false, primaryBroker: 'BrokerA', secondaryBroker: 'BrokerB', failoverLatencyUs: 500, proxyHost: '', proxyPort: 0 },
  selectedBrokerId: 'BrokerA',
  logFilter: 'ALL',

  setMetrics: (metric) => set((state) => ({ metrics: { ...state.metrics, [metric.brokerId]: metric } })),
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 500) })),
  updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
  updateConfig: (config) => set((state) => ({ configs: { ...state.configs, [config.brokerId]: config } })),
  setSelectedBroker: (brokerId) => set({ selectedBrokerId: brokerId }),
  setLogFilter: (logFilter) => set({ logFilter }),
  setHealthScore: (score) => set((state) => ({ healthScores: { ...state.healthScores, [score.brokerId]: score } })),
}));
