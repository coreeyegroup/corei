import { create } from 'zustand';

export type ProviderType = 'BROKER' | 'FEEDER';
export type ConnectionType = 'EXECUTION' | 'MARKET_DATA';
export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING';

export interface BrokerProvider {
  id: string;               // broker_id
  name: string;             // broker_name
  displayName: string;
  adapterName: string;      // e.g., "UpstoxAdapter"
  type: ProviderType;
  enabled: boolean;
  capabilities: string[];
}

export interface BrokerAccount {
  id: string;               // account_id
  brokerId: string;         // broker_id
  displayName: string;
  environment: 'LIVE' | 'PAPER' | 'DEV';
  enabled: boolean;
  credentialRef: string;    // credential_ref (NOT the actual secret)
  routing: {
    primary: string;
    secondary: string;
    failover: string;
  };
}

export interface BrokerCredential {
  ref: string;              // credential_ref
  accountId: string;
  credentialType: string;
  provider: 'KUBERNETES' | 'VAULT';
  status: 'ACTIVE' | 'EXPIRED' | 'ROTATING' | 'DISABLED';
  metadata: string[];       // e.g., ['client_id', 'access_token']
}

export interface BrokerConnection {
  accountId: string;
  type: ConnectionType;
  status: ConnectionStatus;
  sessionId: string;
  lastConnectedAt: string;
  lastError: string | null;
}

interface BrokerAccountState {
  providers: BrokerProvider[];
  accounts: BrokerAccount[];
  credentials: BrokerCredential[];
  connections: BrokerConnection[];

  setProviders: (providers: BrokerProvider[]) => void;
  setAccounts: (accounts: BrokerAccount[]) => void;
  setCredentials: (credentials: BrokerCredential[]) => void;
  setConnections: (connections: BrokerConnection[]) => void;
}

export const useBrokerAccountStore = create<BrokerAccountState>((set) => ({
  providers: [
    { id: 'upstox', name: 'UPSTOX', displayName: 'Upstox', adapterName: 'UpstoxAdapter', type: 'BROKER', enabled: true, capabilities: ['TRADING', 'ORDERS', 'POSITIONS', 'FUNDS'] },
    { id: 'zerodha', name: 'ZERODHA', displayName: 'Zerodha', adapterName: 'ZerodhaAdapter', type: 'BROKER', enabled: true, capabilities: ['TRADING', 'ORDERS', 'MARKET_DATA'] },
    { id: 'fastfeed', name: 'FASTFEED', displayName: 'FastFeed-X', adapterName: 'FastFeedAdapter', type: 'FEEDER', enabled: true, capabilities: ['MARKET_DATA', 'HISTORICAL_DATA'] },
  ],
  accounts: [
    { id: 'acct-001', brokerId: 'upstox', displayName: 'Core Main (India)', environment: 'LIVE', enabled: true, credentialRef: 'broker-cred-acct-001', routing: { primary: 'upstox', secondary: 'zerodha', failover: 'upstox' } },
    { id: 'acct-004', brokerId: 'zerodha', displayName: 'Intraday Zone', environment: 'PAPER', enabled: true, credentialRef: 'broker-cred-acct-004', routing: { primary: 'zerodha', secondary: 'upstox', failover: 'zerodha' } },
  ],
  credentials: [
    { ref: 'broker-cred-acct-001', accountId: 'acct-001', credentialType: 'API_KEY', provider: 'KUBERNETES', status: 'ACTIVE', metadata: ['client_id', 'client_secret', 'access_token'] },
    { ref: 'broker-cred-acct-004', accountId: 'acct-004', credentialType: 'OAUTH2', provider: 'VAULT', status: 'ROTATING', metadata: ['api_key', 'api_secret'] },
  ],
  connections: [
    { accountId: 'acct-001', type: 'EXECUTION', status: 'CONNECTED', sessionId: 'FIX-SES-001', lastConnectedAt: '2026-08-29 10:00:12', lastError: null },
    { accountId: 'acct-001', type: 'MARKET_DATA', status: 'CONNECTED', sessionId: 'WS-001', lastConnectedAt: '2026-08-29 10:00:12', lastError: null },
    { accountId: 'acct-004', type: 'EXECUTION', status: 'ERROR', sessionId: 'FIX-SES-004', lastConnectedAt: '2026-08-29 09:58:00', lastError: 'Heartbeat Timeout' },
  ],

  setProviders: (providers) => set({ providers }),
  setAccounts: (accounts) => set({ accounts }),
  setCredentials: (credentials) => set({ credentials }),
  setConnections: (connections) => set({ connections }),
}));
