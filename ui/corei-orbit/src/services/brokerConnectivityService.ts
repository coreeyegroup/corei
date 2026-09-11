import { useBrokerConnectivityStore } from '../store/brokerConnectivityStore';
import type { FixSessionMetrics, FixLogEntry, BrokerHealthScore } from '../types/brokerConnectivity';

class BrokerConnectivityService {
  private interval: any;

  connect() {
    console.log('Advanced Broker Connectivity Service Started');
    this.startMockStream();
  }

  disconnect() {
    if (this.interval) clearInterval(this.interval);
  }

  startMockStream() {
    const store = useBrokerConnectivityStore.getState();
    const brokers = ['BrokerA', 'BrokerB', 'BrokerC'];

    const metric: FixSessionMetrics = {
      brokerId: 'BrokerA', state: 'LOGGED_IN', p50LatencyUs: 100, p95LatencyUs: 180, p99LatencyUs: 220, jitterUs: 5,
      bandwidthMbps: 450, uptimePercent: 99.99, packetsSent: 50000, packetsReceived: 49900, packetLossPercent: 0.2, retransmissions: 12, outOfOrderPackets: 1, inboundSeqNum: 100, outboundSeqNum: 100, heartbeatTimerSec: 30, isSeqGapDetected: false, lastMessageTimestamp: Date.now(), lastError: null
    };
    store.setMetrics(metric);

    brokers.forEach(brokerId => {
      store.setHealthScore({ brokerId, score: 95, reason: 'Stable and Low Latency' });
    });

    this.interval = setInterval(() => {
      const state = useBrokerConnectivityStore.getState();
      const targetBroker = state.selectedBrokerId;

      brokers.forEach(brokerId => {
        const current = state.metrics[brokerId];
        if (!current) return;

        // Simulate real-time metrics
        const seqGap = Math.random() < 0.1;
        const isSelected = brokerId === targetBroker;
        const isLatencySpike = Math.random() < 0.2;

        const newMetrics: FixSessionMetrics = {
          ...current,
          p50LatencyUs: Math.floor(100 + Math.random() * (isSelected ? 150 : 50)),
          p95LatencyUs: Math.floor(150 + Math.random() * (isSelected ? 250 : 100)),
          p99LatencyUs: Math.floor(200 + Math.random() * (isLatencySpike ? 500 : 150)),
          jitterUs: Math.floor(Math.random() * 20),
          bandwidthMbps: Math.floor(400 + Math.random() * 150),
          packetsSent: current.packetsSent + Math.floor(Math.random() * 100),
          packetsReceived: current.packetsReceived + Math.floor(Math.random() * 98),
          packetLossPercent: Math.random() < 0.05 ? 1.5 : 0.1,
          retransmissions: current.retransmissions + Math.floor(Math.random() * 3),
          inboundSeqNum: current.inboundSeqNum + Math.floor(Math.random() * 5),
          outboundSeqNum: current.outboundSeqNum + Math.floor(Math.random() * 5),
          heartbeatTimerSec: Math.max(0, current.heartbeatTimerSec - 1),
          isSeqGapDetected: seqGap,
          lastMessageTimestamp: Date.now(),
          lastError: seqGap ? 'Sequence gap detected on inbound stream' : (isLatencySpike ? 'High latency spike' : null)
        };
        state.setMetrics(newMetrics);

        // Simulate Log Stream
        if (Math.random() > 0.6) {
          const log: FixLogEntry = {
            id: `${Date.now()}-${brokerId}-${Math.random()}`,
            timestamp: Date.now(),
            brokerId,
            direction: Math.random() > 0.5 ? 'INBOUND' : 'OUTBOUND',
            message: seqGap ? 'Resend Request (2) sent' : 'Heartbeat (0) exchange',
            rawBody: `8=FIX.4.4|9=78|35=0|49=COREI|56=${brokerId}|52=${new Date().toISOString()}|10=050|`
          };
          state.addLog(log);
        }

        // Update Health Score
        let score = 95;
        let reason = 'Stable';
        if (seqGap) { score = 40; reason = 'Critical: Sequence Gap'; }
        else if (isLatencySpike) { score = 70; reason = 'Degraded: High Latency'; }
        const health: BrokerHealthScore = { brokerId, score, reason };
        state.setHealthScore(health);
      });
    }, 1000);
  }

  sendCommand(brokerId: string, command: string) {
    const store = useBrokerConnectivityStore.getState();
    const log: FixLogEntry = { id: `${Date.now()}-${brokerId}-CMD`, timestamp: Date.now(), brokerId, direction: 'SYSTEM', message: command, rawBody: command };
    store.addLog(log);
    console.log(`[${brokerId}] Executing command: ${command}`);
  }
}

export const brokerConnectivityService = new BrokerConnectivityService();
