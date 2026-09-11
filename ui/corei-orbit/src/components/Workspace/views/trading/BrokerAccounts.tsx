import React, { useState } from 'react';
import { useBrokerAccountStore } from '../../../../store/brokerAccountStore';
import { brokerAccountService } from '../../../../services/brokerAccountService';
import './BrokerAccounts.css';

export const BrokerAccounts: React.FC = () => {
  const { providers, accounts, credentials, connections } = useBrokerAccountStore();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const accountDetails = accounts.find(a => a.id === selectedAccount);
  const accountConnections = connections.filter(c => c.accountId === selectedAccount);
  const accountCredential = credentials.find(c => c.accountId === selectedAccount);

  return (
    <div className="ba-institutional-container">

      {/* Top Action Bar */}
      <div className="ba-topbar">
        <h2>Broker / Account / Credential Control Plane</h2>
        <div className="ba-actions">
          <button className="ba-btn primary" onClick={() => brokerAccountService.createAccount({})}>+ Register Account</button>
          <button className="ba-btn primary" onClick={() => brokerAccountService.testConnection(selectedAccount || '')}>Test Connection</button>
        </div>
      </div>

      <div className="ba-institutional-grid">

        {/* Pane 1: Provider Registry */}
        <div className="ba-pane">
          <h3>1. Provider Registry</h3>
          <div className="ba-pane-content">
            {providers.map(p => (
              <div key={p.id} className={`ba-card-item ${p.enabled ? '' : 'disabled'}`}>
                <div className="ba-card-header">
                  <strong>{p.displayName}</strong>
                  <span className={`badge ${p.type === 'BROKER' ? 'broker' : 'feeder'}`}>{p.type}</span>
                </div>
                <div className="ba-card-meta">
                  <span className="code">{p.adapterName}</span>
                </div>
                <div className="ba-tags">
                  {p.capabilities.map(cap => <span key={cap} className="tag">{cap}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pane 2: Account Registry (Metadata from PostgreSQL) */}
        <div className="ba-pane">
          <h3>2. Account Registry</h3>
          <div className="ba-pane-content">
            {accounts.map(acc => {
              const broker = providers.find(p => p.id === acc.brokerId);
              return (
                <div
                  key={acc.id}
                  className={`ba-card-item ${selectedAccount === acc.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAccount(acc.id)}
                >
                  <div className="ba-card-header">
                    <strong>{acc.displayName}</strong>
                    <span className={`badge ${acc.environment.toLowerCase()}`}>{acc.environment}</span>
                  </div>
                  <div className="ba-card-meta">
                    <span>Account: <span className="code">{acc.id}</span></span>
                    <span>Broker: <b>{broker?.displayName}</b></span>
                  </div>
                  <div className="ba-routing">
                    <span title="Primary">P: {acc.routing.primary}</span>
                    <span title="Secondary">S: {acc.routing.secondary}</span>
                    <span title="Failover">F: {acc.routing.failover}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pane 3: Credential Registry (NO Secrets, only Refs & Metadata) */}
        <div className="ba-pane">
          <h3>3. Credential Registry</h3>
          <div className="ba-pane-content">
            {credentials.map(cred => (
              <div key={cred.ref} className="ba-card-item">
                <div className="ba-card-header">
                  <span className="code">{cred.ref}</span>
                  <span className={`badge ${cred.status.toLowerCase()}`}>{cred.status}</span>
                </div>
                <div className="ba-card-meta">
                  <span>Backend: <b>{cred.provider}</b></span>
                  <span>Type: <b>{cred.credentialType}</b></span>
                </div>
                <div className="ba-card-meta">
                  <span>Fields:</span>
                  <div className="ba-tags">
                    {cred.metadata.map(m => <span key={m} className="tag locked">🔒 {m}</span>)}
                  </div>
                </div>
                <button
                  className="ba-btn small"
                  onClick={(e) => { e.stopPropagation(); brokerAccountService.rotateCredential(cred.ref); }}
                >
                  Rotate Secret
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pane 4: Connection Registry (Execution vs Market Data) */}
        <div className="ba-pane">
          <h3>4. Connection Registry</h3>
          <div className="ba-pane-content">
            {connections.map((conn, idx) => {
              const acc = accounts.find(a => a.id === conn.accountId);
              return (
                <div key={idx} className="ba-card-item">
                  <div className="ba-card-header">
                    <strong>{acc?.displayName || conn.accountId}</strong>
                    <span className={`badge ${conn.type === 'EXECUTION' ? 'exec' : 'data'}`}>
                      {conn.type === 'EXECUTION' ? '⚡ Execution' : '📊 Market Data'}
                    </span>
                  </div>
                  <div className="ba-card-meta">
                    <span>Status: <span className={`badge ${conn.status.toLowerCase()}`}>{conn.status}</span></span>
                    <span>Session: <span className="code">{conn.sessionId}</span></span>
                  </div>
                  <div className="ba-card-meta">
                    <span>Last Connected: {conn.lastConnectedAt}</span>
                  </div>
                  {conn.lastError && <div className="error-text">Error: {conn.lastError}</div>}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Detail Inspector (Bottom Section) */}
      {selectedAccount && (
        <div className="ba-inspector">
          <h3>Account Inspector: {selectedAccount}</h3>
          <div className="ba-inspector-grid">
            <div>
              <h4>Metadata (PostgreSQL)</h4>
              <p>Broker: <b>{accountDetails?.brokerId}</b></p>
              <p>Credential Ref: <span className="code">{accountDetails?.credentialRef}</span></p>
              <p>Environment: <b>{accountDetails?.environment}</b></p>
            </div>
            <div>
              <h4>Active Connections</h4>
              {accountConnections.length === 0 && <p className="muted">No connections.</p>}
              {accountConnections.map((conn, idx) => (
                <p key={idx} className={`connection-line ${conn.status.toLowerCase()}`}>
                  {conn.type}: {conn.status} (Session: {conn.sessionId})
                </p>
              ))}
            </div>
            <div>
              <h4>Credential Status</h4>
              {accountCredential ? (
                <p>Provider: <b>{accountCredential.provider}</b> | Status: <b>{accountCredential.status}</b></p>
              ) : <p className="muted">No credential bound.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
