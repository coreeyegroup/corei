// src/components/BottomPanel/BottomPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { addLogListener, removeLogListener } from '../../services/loggerService';
import type { LogEntry } from '../../services/loggerService';
import { useUiStore } from '../../store/uiStore';
import './BottomPanel.css';

const BottomPanel: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '10:32:15', level: 'info', message: '🚀 Alpha Flow control plane initialized' },
    { time: '10:32:16', level: 'info', message: '📡 n8n webhook listener active • port 5678' },
    { time: '10:32:17', level: 'info', message: '📊 Strategy loaded: Mean Reversion • lookback=20' },
    { time: '10:32:18', level: 'info', message: '✅ System ready • awaiting market conditions' },
  ]);
  const [activeTab, setActiveTab] = useState('all');
  const terminalRef = useRef<HTMLDivElement>(null);
  const { terminalAutoScroll, toggleAutoScroll } = useUiStore();

  // Subscribe to logger
  useEffect(() => {
    const handler = (entry: LogEntry) => {
      setLogs(prev => [...prev.slice(-499), entry]);
    };
    addLogListener(handler);
    return () => removeLogListener(handler);
  }, []);

  // Auto‑scroll
  useEffect(() => {
    if (terminalAutoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, terminalAutoScroll]);

  const filtered = logs.filter(log => {
    if (activeTab === 'all') return true;
    if (activeTab === 'system') return log.level === 'info' || log.level === 'warn';
    if (activeTab === 'trades') return log.level === 'trade';
    if (activeTab === 'errors') return log.level === 'error';
    return true;
  });

  return (
    <div className="bottom-panel">
      <div className="panel-header">
        <div className="tabs">
          <span className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All</span>
          <span className={activeTab === 'system' ? 'active' : ''} onClick={() => setActiveTab('system')}>System</span>
          <span className={activeTab === 'trades' ? 'active' : ''} onClick={() => setActiveTab('trades')}>Trades</span>
          <span className={activeTab === 'errors' ? 'active' : ''} onClick={() => setActiveTab('errors')}>Errors</span>
        </div>
        <div className="panel-actions">
          <button onClick={() => setLogs([])}>✕ Clear</button>
          <button onClick={toggleAutoScroll}>
            {terminalAutoScroll ? '⏸ Auto-scroll' : '▶ Auto-scroll'}
          </button>
        </div>
      </div>
      <div className="panel-body" ref={terminalRef}>
        {filtered.map((log, i) => (
          <div key={i} className={`log-line log-${log.level}`}>
            <span className="log-time">[{log.time}]</span>
            <span className="log-msg">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomPanel;
