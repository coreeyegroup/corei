// src/components/Workspace/views/trading/PositionsPanel.tsx
import React from 'react';
import { useTradeStore } from '../../../../services/tradeService';
import { TablePanel } from '../panels';

const PositionsPanel: React.FC = () => {
  const { positions } = useTradeStore();

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'side', label: 'Side' },
    { key: 'qty', label: 'Qty' },
    { key: 'entryPrice', label: 'Entry' },
    { key: 'currentPrice', label: 'Current' },
    { key: 'pnl', label: 'P&L' },
  ];

  return (
    <div className="panel-container">
      <h2>Positions</h2>
      <TablePanel
        columns={columns}
        data={positions.map(p => ({
          ...p,
          entryPrice: p.entryPrice?.toFixed(2) || '—',
          currentPrice: p.currentPrice?.toFixed(2) || '—',
          pnl: p.pnl?.toFixed(2) || '0.00',
        }))}
      />
    </div>
  );
};

export default PositionsPanel;
