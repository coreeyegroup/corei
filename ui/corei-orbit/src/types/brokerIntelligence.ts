export type ConnectionState =
  | 'HEALTHY'
  | 'CONNECTING'
  | 'CONNECTED'
  | 'DEGRADED'
  | 'DISCONNECTED'
  | 'AUTH_REQUIRED'
  | 'AUTH_FAILED'
  | 'RATE_LIMITED'
  | 'ERROR'
  | 'DISABLED'
  | 'UNKNOWN';

export interface BrokerProvider {
  id: string;
  name: string;
  adapterName: string;
  adapterVersion: string;
  type: 'BROKER' | 'FEEDER' | 'EXCHANGE';
  region: string;
  environment: 'LIVE' | 'PAPER' | 'TEST';
  enabled: boolean;
  status: string;
  health: string;
  state: ConnectionState;
  authState: ConnectionState;
  restState: ConnectionState;
  wsState: ConnectionState;
  marketDataState: ConnectionState;
  executionState: ConnectionState;
  latency: string;
  rateLimitState: string;
  accountCount: number;
  credentialCount: number;
}

export interface BrokerAccount {
  id: string;
  brokerId: string;
  displayName: string;
  environment: 'LIVE' | 'PAPER' | 'TEST';
  enabled: boolean;
  connected: boolean;
  sessionId: string | null;
  credentialRef: string | null;
  health: ConnectionState;
  tradingEnabled: boolean;
  marketDataEnabled: boolean;
}

export interface BrokerCredential {
  id: string;
  brokerId: string;
  accountId: string;
  type: string;
  provider: string;
  secretRef: string;
  status: 'ACTIVE' | 'VALID' | 'EXPIRING' | 'EXPIRED' | 'DISABLED' | 'ROTATING';
  lastValidation: string | null;
  expiresAt: string | null;
}

export interface ExecutionRoute {
  id: string;
  dataSource: string;
  intelligenceSource: string;
  decisionSource: string;
  executionBroker: string;
  executionAccount: string;
  routeStatus: 'ACTIVE' | 'DISABLED' | 'DEGRADED';
  routeType: 'PRIMARY' | 'SECONDARY' | 'FAILOVER';
}

export interface DiagnosticEvent {
  timestamp: string;
  provider: string;
  account: string;
  severity: 'INFO' | 'WARN' | 'ERROR';
  category: string;
  message: string;
}

export interface AuditEvent {
  timestamp: string;
  operator: string;
  action: string;
  target: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
}
