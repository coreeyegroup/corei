// src/components/StatusBar/StatusBar.tsx

import React from 'react';
import { useN8nStore } from '../../services/n8nService';
import { useTradeStore } from '../../services/tradeService';
import { useUptimeStore } from '../../services/uptimeService';
import { useUiStore } from '../../store/uiStore';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import './StatusBar.css';

const StatusBar: React.FC = () => {
  const workflowState = useN8nStore((state) => state.state);
  const positions = useTradeStore((state) => state.positions);
  const orders = useTradeStore((state) => state.orders);
  const { uptimeSeconds } = useUptimeStore();
  const { strategyName } = useUiStore();

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [
      String(h).padStart(2, '0'),
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0'),
    ].join(':');
  };

  const stateColor: Record<string, string> = {
    idle: '#64748B',
    running: '#00E5A0',
    paused: '#F59E0B',
    stopped: '#FF4D4D',
  };

  const color = stateColor[workflowState] || '#64748B';

  const lastOrder =
    orders.length > 0
      ? orders.reduce((latest, order) =>
          order.time > latest.time ? order : latest,
        )
      : null;

  const lastTradeTime = lastOrder
    ? new Date(lastOrder.time).toLocaleTimeString()
    : '--:--:--';

  const handleBellClick = () => {
    toast.info('Notifications', {
      description: 'No new trading alerts.',
    });
  };

  return (
    <div className="status-bar">
      <div className="status-left">
        <span
          className="status-indicator"
          style={{ color }}
        >
          <span
            className="dot"
            style={{ backgroundColor: color }}
          />
          {workflowState.toUpperCase()}
        </span>

        <span className="separator">|</span>

        <span>
          Strategy: <strong>{strategyName}</strong>
        </span>

        <span className="separator">|</span>

        <span>
          Positions: <strong>{positions.length}</strong>
        </span>

        <span className="separator">|</span>

        <span>
          Orders: <strong>{orders.length}</strong>
        </span>

        <span className="separator">|</span>

        <span>
          Last Trade: <strong>{lastTradeTime}</strong>
        </span>

        <span className="separator">|</span>

        <span>
          Uptime: <strong>{formatUptime(uptimeSeconds)}</strong>
        </span>
      </div>

      <div className="status-right">
        <button
          type="button"
          className="notification-bell"
          onClick={handleBellClick}
          aria-label="Trading notifications"
        >
          <Bell size={14} />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
