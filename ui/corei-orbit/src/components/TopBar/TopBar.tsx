// src/components/TopBar/TopBar.tsx
import React, { useRef } from 'react';
import { useN8nStore } from '../../services/n8nService';
import { useUiStore } from '../../store/uiStore';
import { log } from '../../services/loggerService';
import './TopBar.css';

const TopBar: React.FC = () => {
  const { state, start, pause, stop, kill } = useN8nStore();
  const { setStrategyName, fontSize, increaseFontSize, decreaseFontSize } = useUiStore();
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleStrategyChange = () => {
    if (selectRef.current) {
      const name = selectRef.current.value;
      setStrategyName(name);
      log('info', `🔄 Strategy changed to ${name}`);
    }
  };

  const handleStart = async () => {
    await start();
    log('info', '▶ Workflow STARTED');
  };
  const handlePause = async () => {
    await pause();
    log('warn', '⏸ Workflow PAUSED');
  };
  const handleStop = async () => {
    await stop();
    log('info', '⏹ Workflow STOPPED');
  };
  const handleKill = async () => {
    await kill();
    log('error', '💀 EMERGENCY KILL initiated');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="logo"><span className="accent">α</span>Flow</span>
        <nav className="menu">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Terminal</span>
          <span>Help</span>
        </nav>
      </div>
      <div className="topbar-center">
        <select
          className="strategy-select"
          ref={selectRef}
          defaultValue="Mean Reversion"
          onChange={handleStrategyChange}
        >
          <option>Scalping v2</option>
          <option>Mean Reversion</option>
          <option>Momentum Burst</option>
        </select>
        <button className="btn primary" onClick={handleStart} disabled={state === 'running'}>▶ Start</button>
        <button className="btn" onClick={handlePause} disabled={state !== 'running'}>⏸ Pause</button>
        <button className="btn" onClick={handleStop} disabled={state === 'idle' || state === 'stopped'}>⏹ Stop</button>
        <button className="btn danger" onClick={handleKill}>✖ Kill</button>

        {/* Font size controls */}
        <div className="font-controls" style={{ display: 'flex', gap: 2, marginLeft: 8, alignItems: 'center' }}>
          <button
            onClick={decreaseFontSize}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '0 6px',
              borderRadius: 2,
              fontSize: 10,
              cursor: 'pointer',
              height: 20,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            A-
          </button>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', minWidth: 20, textAlign: 'center' }}>
            {fontSize}
          </span>
          <button
            onClick={increaseFontSize}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '0 6px',
              borderRadius: 2,
              fontSize: 10,
              cursor: 'pointer',
              height: 20,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            A+
          </button>
        </div>
      </div>
      <div className="topbar-right">
        <span className={`status-dot ${state === 'running' ? 'running' : ''}`}></span>
        <span className="status-label">{state.toUpperCase()}</span>
      </div>
    </header>
  );
};

export default TopBar;
