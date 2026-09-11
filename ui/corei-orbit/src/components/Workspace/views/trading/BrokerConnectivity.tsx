import React, { useEffect, useMemo } from 'react';
import { brokerConnectivityService } from '../../../../services/brokerConnectivityService';
import { useBrokerConnectivityStore } from '../../../../store/brokerConnectivityStore';
import type { FixSessionConfig } from '../../../../types/brokerConnectivity';
import './BrokerConnectivity.css';

export const BrokerConnectivity: React.FC = () => {
  const { configs, metrics, logs, healthScores, settings, selectedBrokerId, logFilter, setSelectedBroker, setLogFilter, updateSettings, updateConfig } = useBrokerConnectivityStore();

  useEffect(() => {
    brokerConnectivityService.connect();
    return () => brokerConnectivityService.disconnect();
  }, []);

  const currentConfig = configs[selectedBrokerId];
  const currentMetrics = metrics[selectedBrokerId];

  const filteredLogs = useMemo(() => {
    if (logFilter === 'ALL') return logs;
    return logs.filter(log => log.direction === logFilter);
  }, [logs, logFilter]);

  const handleSelectBroker = (brokerId: string) => {
    setSelectedBroker(brokerId);
  };

  const handleSendCommand = (command: string) => {
    brokerConnectivityService.sendCommand(selectedBrokerId, command);
  };

  const handleConfigChange = (field: keyof FixSessionConfig, value: any) => {
    if (!currentConfig) return;
    updateConfig({ ...currentConfig, [field]: value });
  };

  return (
    <div className="bc-detail-container">
      {/* Top Header */}
      <div className="bc-detail-header">
        <h2>Broker Connectivity & FIX Engine Monitor</h2>
        <div className="bc-global-actions">
          <button className="bc-btn secondary" onClick={() => handleSendCommand('Global Reset Sequences')}>Global Reset Seq</button>
          <button className="bc-btn secondary" onClick={() => handleSendCommand('Global Test Request')}>Global Test Req</button>
          <button className="bc-btn danger">Kill Switch</button>
        </div>
      </div>

      <div className="bc-detail-layout">
        {/* LEFT: Session Explorer */}
        <div className="bc-session-list">
          <h3>Sessions</h3>
          {Object.values(metrics).map((metric) => (
            <div
              key={metric.brokerId}
              className={`bc-session-item ${metric.brokerId === selectedBrokerId ? 'active' : ''}`}
              onClick={() => handleSelectBroker(metric.brokerId)}
            >
              <span className={`status-dot ${metric.state.toLowerCase()}`} />
              <span className="bc-session-name">{metric.brokerId}</span>
              <span className={`score-pill ${healthScores[metric.brokerId]?.score > 70 ? 'good' : 'bad'}`}>
                {healthScores[metric.brokerId]?.score ?? 'N/A'}
              </span>
            </div>
          ))}
          <div className="bc-config-list">
            <h4>Configurations</h4>
            {Object.values(configs).map(config => (
              <div key={config.brokerId} className="bc-config-mini">
                <strong>{config.brokerId}</strong>: {config.host}:{config.port} ({config.ssl ? 'SSL' : 'TCP'})
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Metrics, Sequences, Logs */}
        <div className="bc-main-panel">
          {currentMetrics ? (
            <>
              <div className="bc-section-title">Real-Time Telemetry ({currentMetrics.brokerId})</div>
              <div className="bc-metrics-grid">
                <div className="bc-metric-card"><label>P50 / P95 / P99 (μs)</label><span>{currentMetrics.p50LatencyUs} / {currentMetrics.p95LatencyUs} / {currentMetrics.p99LatencyUs}</span></div>
                <div className="bc-metric-card"><label>Jitter (μs)</label><span>{currentMetrics.jitterUs}</span></div>
                <div className="bc-metric-card"><label>Packet Loss (%)</label><span className={currentMetrics.packetLossPercent > 1 ? 'red' : ''}>{currentMetrics.packetLossPercent}</span></div>
                <div className="bc-metric-card"><label>Retransmissions</label><span>{currentMetrics.retransmissions}</span></div>
                <div className="bc-metric-card"><label>Bandwidth (Mbps)</label><span>{currentMetrics.bandwidthMbps}</span></div>
                <div className="bc-metric-card"><label>Uptime (%)</label><span>{currentMetrics.uptimePercent}</span></div>
              </div>

              <div className="bc-section-title">Sequence & Session Control</div>
              <div className="bc-seq-panel">
                <div className="bc-seq-box">
                  <span>Inbound Seq: <strong>{currentMetrics.inboundSeqNum}</strong></span>
                  {currentMetrics.isSeqGapDetected && <span className="danger-badge">GAP DETECTED</span>}
                </div>
                <div className="bc-seq-box">
                  <span>Outbound Seq: <strong>{currentMetrics.outboundSeqNum}</strong></span>
                  <button className="bc-btn small" onClick={() => handleSendCommand('Reset Inbound Seq')}>Reset In</button>
                  <button className="bc-btn small" onClick={() => handleSendCommand('Reset Outbound Seq')}>Reset Out</button>
                </div>
              </div>

              <div className="bc-section-title">FIX Message Stream (Raw)
                <div className="bc-log-filters">
                  <button className={logFilter === 'ALL' ? 'active' : ''} onClick={() => setLogFilter('ALL')}>All</button>
                  <button className={logFilter === 'INBOUND' ? 'active' : ''} onClick={() => setLogFilter('INBOUND')}>Inbound</button>
                  <button className={logFilter === 'OUTBOUND' ? 'active' : ''} onClick={() => setLogFilter('OUTBOUND')}>Outbound</button>
                  <button className={logFilter === 'SYSTEM' ? 'active' : ''} onClick={() => setLogFilter('SYSTEM')}>System</button>
                </div>
              </div>
              <div className="bc-log-window">
                {filteredLogs.filter(log => log.brokerId === selectedBrokerId).map((log) => (
                  <div key={log.id} className={`bc-log-line ${log.direction.toLowerCase()}`}>
                    <span className="bc-log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span className="bc-log-dir">[{log.direction}]</span>
                    <span className="bc-log-msg">{log.message}</span>
                    <span className="bc-log-raw" title={log.rawBody}>View Raw</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">Select a session to view telemetry</div>
          )}
        </div>

        {/* RIGHT: Deep Configuration & Actions */}
        <div className="bc-settings-panel">
          <h3>Selected Session: {selectedBrokerId}</h3>

          <div className="bc-setting-group">
            <label>Host Address</label>
            <input type="text" value={currentConfig?.host || ''} onChange={(e) => handleConfigChange('host', e.target.value)} />
          </div>
          <div className="bc-setting-group">
            <label>Port</label>
            <input type="number" value={currentConfig?.port || 0} onChange={(e) => handleConfigChange('port', parseInt(e.target.value))} />
          </div>
          <div className="bc-setting-group">
            <label>SSL/TLS Enabled</label>
            <input type="checkbox" checked={currentConfig?.ssl || false} onChange={(e) => handleConfigChange('ssl', e.target.checked)} />
          </div>
          <div className="bc-setting-group">
            <label>Heartbeat Interval (sec)</label>
            <input type="number" value={currentConfig?.heartbeatIntervalSec || 30} onChange={(e) => handleConfigChange('heartbeatIntervalSec', parseInt(e.target.value))} />
          </div>
          <div className="bc-setting-group">
            <label>Socket Buffer (KB)</label>
            <input type="number" value={currentConfig?.socketBufferKB || 256} onChange={(e) => handleConfigChange('socketBufferKB', parseInt(e.target.value))} />
          </div>

          <div className="bc-divider" />

          <h4>Commands</h4>
          <div className="bc-action-grid">
            <button className="bc-btn secondary" onClick={() => handleSendCommand('Logout (5)')}>Logout</button>
            <button className="bc-btn secondary" onClick={() => handleSendCommand('Test Request (1)')}>Test Request</button>
            <button className="bc-btn secondary" onClick={() => handleSendCommand('Resend Request (2)')}>Resend Request</button>
            <button className="bc-btn warning" onClick={() => handleSendCommand('Disconnect Socket')}>Disconnect</button>
          </div>

          <div className="bc-divider" />

          <h4>Failover Settings</h4>
          <div className="bc-setting-group">
            <label>Auto Reconnect</label>
            <input type="checkbox" checked={settings.autoReconnect} onChange={(e) => updateSettings({ autoReconnect: e.target.checked })} />
          </div>
          <div className="bc-setting-group">
            <label>Primary Broker</label>
            <select value={settings.primaryBroker} onChange={(e) => updateSettings({ primaryBroker: e.target.value })}>
              {Object.keys(configs).map(brokerId => <option key={brokerId} value={brokerId}>{brokerId}</option>)}
            </select>
          </div>
          <div className="bc-setting-group">
            <label>Secondary Broker</label>
            <select value={settings.secondaryBroker} onChange={(e) => updateSettings({ secondaryBroker: e.target.value })}>
              {Object.keys(configs).map(brokerId => <option key={brokerId} value={brokerId}>{brokerId}</option>)}
            </select>
          </div>
          <div className="bc-setting-group">
            <label>Failover Latency Threshold (μs)</label>
            <input type="number" value={settings.failoverLatencyUs} onChange={(e) => updateSettings({ failoverLatencyUs: parseInt(e.target.value) })} />
          </div>
        </div>
      </div>
    </div>
  );
};
