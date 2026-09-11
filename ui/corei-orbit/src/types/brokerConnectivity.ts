export type FIXSessionState = 'CONNECTING' | 'LOGGED_IN' | 'LOGGED_OUT' | 'DISCONNECTED' | 'WAITING_FOR_HEARTBEAT' | 'RECEIVING_RESEND';

export interface FixSessionConfig {
  brokerId: string;
  host: string;
  port: number;
  ssl: boolean;
  fixVersion: string;
  senderCompId: string;
  targetCompId: string;
  heartbeatIntervalSec: number;
  reconnectAttempts: number;
  socketBufferKB: number;
  tcpNoDelay: boolean;
  privateIp: string;
}

export interface FixSessionMetrics {
  brokerId: string;
  state: FIXSessionState;
  p50LatencyUs: number;
  p95LatencyUs: number;
  p99LatencyUs: number;
  jitterUs: number;
  bandwidthMbps: number;
  uptimePercent: number;
  packetsSent: number;
  packetsReceived: number;
  packetLossPercent: number;
  retransmissions: number;
  outOfOrderPackets: number;
  inboundSeqNum: number;
  outboundSeqNum: number;
  heartbeatTimerSec: number;
  isSeqGapDetected: boolean;
  lastMessageTimestamp: number;
  lastError: string | null;
}

export interface FixLogEntry {
  id: string;
  timestamp: number;
  brokerId: string;
  direction: 'INBOUND' | 'OUTBOUND' | 'SYSTEM';
  message: string;
  rawBody: string; // full FIX message string
}

export interface ConnectivitySettings {
  autoReconnect: boolean;
  usePrimaryOnly: boolean;
  primaryBroker: string;
  secondaryBroker: string;
  failoverLatencyUs: number;
  proxyHost: string;
  proxyPort: number;
}

export interface BrokerHealthScore {
  brokerId: string;
  score: number; // 0-100
  reason: string; // e.g. "High latency", "Sequence gap", "Stable"
}
