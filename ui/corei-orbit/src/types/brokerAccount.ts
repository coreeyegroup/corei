export type ProviderType = 'BROKER' | 'FEEDER';
export type ConnectionType = 'EXECUTION' | 'MARKET_DATA';
export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING';

export interface BrokerProvider {
  id: string; // e.g., "upstox"
  name: string; // e.g., "Upstox"
  type: ProviderType;
  status: 'ACTIVE' | 'INACTIVE' | 'DEGRADED';
  capabilities: string[]; // e.g., ['TRADING', 'ORDERS', 'MARKET_DATA']
}

export interface BrokerAccount {
  id: string; // e.g., "ACC-001"
  ownerId: string;
  providerId: string; // linked to BrokerProvider.id
  name: string; // e.g., "Core Trading Main"
  status: 'ACTIVE' | 'SUSPENDED';
  environment: 'LIVE' | 'PAPER' | 'DEV';
  credentialRef: string; // e.g., "broker-cred-acct-001" (Secret path, never actual secret)
  routing: {
    primaryBroker: string;
    secondaryBroker: string;
    failoverBroker: string;
  };
}

export interface BrokerCredential {
  id: string;
  secretBackend: 'KUBERNETES' | 'VAULT';
  status: 'ACTIVE' | 'EXPIRED' | 'ROTATING';
  expiresAt: string | null;
  lastRotatedAt: string;
}

export interface Connection {
  id: string;
  providerId: string;
  accountId: string | null; // null if it's a pure data feeder
  credentialId: string;
  type: ConnectionType;
  status: ConnectionStatus;
  lastError: string | null;
}
