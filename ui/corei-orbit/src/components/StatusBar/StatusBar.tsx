// src/components/StatusBar/StatusBar.tsx
import React from 'react';
import { useN8nStore } from '../../services/n8nService';
import { useTradeStore } from '../../services/tradeService';
import { useUptimeStore } from '../../services/uptimeService';
import { useUiStore } from '../../store/uiStore';
import { Bell, BellDot } from 'lucide-react';
import { toast } from 'sonner';
import './StatusBar.css';

// We'll use sonner for notifications, but also keep a small counter
const StatusBar: React.FC = () => {
  const workflowState = useN8nStore((state) => state.state);
  const positions = useTradeStore((state) => state.positions);
  const { uptimeSeconds } = useUptimeStore();
  const { strategyName } = useUiStore();

  // Format uptime as HH:MM:SS
  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const stateColor = {
    idle: '#64748B',
    running: '#00E5A0',
    paused: '#F59E0B',
    stopped: '#FF4D4D',
  }[workflowState] || '#64748B';

  const lastTrade = positions.length > 0 ? positions[positions.length - 1] : null;
  const lastTradeTime = lastTrade ? new Date(parseInt(lastTrade.id.split('-')[1])).toLocaleTimeString() : '--:--:--';

  const handleBellClick = () => {
    toast.info('📋 Notifications', {
      description: 'System running smoothly. No new alerts.',
    });
  };

  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-indicator" style={{ color: stateColor }}>
          <span className="dot" style={{ backgroundColor: stateColor }}></span>
          {workflowState.toUpperCase()}
        </span>
        <span className="separator">|</span>
        <span>Strategy: <strong>{strategyName}</strong></span>
        <span className="separator">|</span>
        <span>Positions: <strong>{positions.length}</strong></span>
        <span className="separator">|</span>
        <span>Last Trade: <strong>{lastTradeTime}</strong></span>
        <span className="separator">|</span>
        <span>Uptime: <strong>{formatUptime(uptimeSeconds)}</strong></span>
      </div>
      <div className="status-right">
        <button className="notification-bell" onClick={handleBellClick}>
          <Bell size={14} />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;