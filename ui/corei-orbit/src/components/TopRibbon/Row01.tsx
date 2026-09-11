// src/components/TopRibbon/Row01.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useShellStore } from '../../store/shellStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useN8nStore } from '../../services/n8nService';
import { DropdownMenu } from './DropdownMenu';
import { log } from '../../services/loggerService';
import {
  Search,
  Command,
  Clock,
  PanelLeft,
  PanelBottom,
  PanelRight,
  LayoutPanelTop,
  HelpCircle,
  Settings,
  ChevronDown,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const Row01: React.FC = () => {
  // --- STORES ---
  const { state } = useN8nStore();
  // Removed useUiStore import (not needed until controls are relocated)

  const { organization, workspace, environment, operator, setOrganization, setWorkspace } = useShellStore();
  const { alerts } = useNotificationStore();

  // --- RUNTIME LABEL ---
  const runtimeLabel = useMemo(() => {
    if (state === 'running') return 'READY';
    if (state === 'paused') return 'PAUSED';
    if (state === 'idle' || state === 'stopped') return 'READY';
    return 'STARTING';
  }, [state]);

  // --- CLOCK ---
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const timezone = 'IST';

  // --- HANDLERS ---
  const handlePanelMode = (mode: 'left' | 'bottom' | 'right' | 'full') => {
    log('info', `🖥 Panel mode changed to ${mode}`);
    window.dispatchEvent(new CustomEvent('corei:panel-mode:change', { detail: { mode } }));
  };

  const handleSearchFocus = () => log('info', '🔍 Search focused');
  const handleCommandPalette = () => {
    log('info', '⌨️ Command palette opened');
    window.dispatchEvent(new CustomEvent('corei:command-palette:open'));
  };
  const handleHelp = () => {
    log('info', '❓ Help opened');
    window.dispatchEvent(new CustomEvent('corei:help:open'));
  };
  const handleSettings = () => {
    log('info', '⚙️ Settings opened');
    window.dispatchEvent(new CustomEvent('corei:settings:open'));
  };
  const handleAlertClick = () => log('info', '🔔 Alerts clicked');

  return (
    <div className="row-01">
      {/* --- IDENTITY & CONTEXT --- */}
      <span className="identity">COREI OS</span>

      <DropdownMenu trigger={<span className="bounded-item">ORG <strong>{organization}</strong> <ChevronDown size={12} /></span>}>
        <div className="menu-item" onClick={() => setOrganization('COREI Institutional')}>COREI Institutional</div>
        <div className="menu-item" onClick={() => setOrganization('COREI Labs')}>COREI Labs</div>
        <div className="menu-item" onClick={() => setOrganization('COREI Research')}>COREI Research</div>
      </DropdownMenu>

      <DropdownMenu trigger={<span className="bounded-item">WORKSPACE <strong>{workspace}</strong> <ChevronDown size={12} /></span>}>
        <div className="menu-item" onClick={() => setWorkspace('default')}>default</div>
        <div className="menu-item" onClick={() => setWorkspace('trading')}>trading</div>
        <div className="menu-item" onClick={() => setWorkspace('analytics')}>analytics</div>
      </DropdownMenu>

      <span className="bounded-item env">ENV <strong>{environment}</strong></span>
      <span className="bounded-item operator-item">OPERATOR <strong>{operator}</strong></span>

      <span className="bounded-item runtime">
        RUNTIME <strong>{runtimeLabel}</strong>
        {runtimeLabel === 'READY' && <CheckCircle size={12} className="status-icon ready" />}
        {runtimeLabel === 'PAUSED' && <AlertCircle size={12} className="status-icon degraded" />}
        {runtimeLabel === 'STARTING' && <AlertCircle size={12} className="status-icon starting" />}
      </span>

      <span className="bounded-item alerts" onClick={handleAlertClick}>
        ALERTS <strong>{alerts}</strong>
        {alerts > 0 && <span className="alert-badge">{alerts}</span>}
      </span>

      {/* --- SEARCH CONTROL (now takes the available flex space) --- */}
      <div className="search-control">
        <Search size={14} className="search-icon" />
        <input type="text" placeholder="Find / Search..." className="search-input" onFocus={handleSearchFocus} />
        <span className="shortcut-hint">⌘K</span>
      </div>

      {/* --- RIGHT CONTROLS --- */}
      <button className="icon-button command-button" onClick={handleCommandPalette}>
        <Command size={16} />
        <span className="btn-label">COMMAND</span>
        <span className="shortcut-hint">⌘⇧P</span>
      </button>

      <DropdownMenu align="right" trigger={
        <span className="clock-trigger">
          <Clock size={14} />
          <span className="time-text">{formatTime(time)}</span>
          <span className="tz-text">{timezone}</span>
          <ChevronDown size={12} />
        </span>
      }>
        <div className="menu-item">Local Time <span className="menu-value">{formatTime(time)}</span></div>
        <div className="menu-item">Timezone <span className="menu-value">{timezone}</span></div>
        <div className="menu-item">UTC <span className="menu-value">{new Date().toUTCString().split(' ')[4]}</span></div>
        <div className="menu-item">Date <span className="menu-value">{new Date().toLocaleDateString('en-IN')}</span></div>
        <hr className="menu-divider" />
        <div className="menu-item">Time Settings →</div>
      </DropdownMenu>

      <div className="panel-mode-group">
        <button className="panel-mode-btn" onClick={() => handlePanelMode('left')} title="Left Panel"><PanelLeft size={16} /></button>
        <button className="panel-mode-btn" onClick={() => handlePanelMode('bottom')} title="Bottom Panel"><PanelBottom size={16} /></button>
        <button className="panel-mode-btn" onClick={() => handlePanelMode('right')} title="Right Panel"><PanelRight size={16} /></button>
        <button className="panel-mode-btn" onClick={() => handlePanelMode('full')} title="Full Screen"><LayoutPanelTop size={16} /></button>
      </div>

      <button className="icon-button help-button" onClick={handleHelp}><HelpCircle size={18} /></button>
      <button className="icon-button settings-button" onClick={handleSettings}><Settings size={18} /></button>
    </div>
  );
};

export default Row01;
