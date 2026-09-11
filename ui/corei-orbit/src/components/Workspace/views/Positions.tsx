// src/components/Workspace/views/Positions.tsx
import React, { useEffect } from 'react';
import { useTradeStore } from '../../../services/tradeService';
import { TablePanel } from './panels';

const Positions: React.FC = () => {
  const { positions, fetchData } = useTradeStore();

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'side', label: 'Side' },
    { key: 'qty', label: 'Qty' },
    { key: 'entryPrice', label: 'Entry' },
    { key: 'currentPrice', label: 'Current' },
    { key: 'pnl', label: 'P&L' },
  ];

  return (
    <div className="view-container">
      <h2 className="view-title">◘ Positions</h2>
      <TablePanel
        title="Open Positions"
        columns={columns}
        data={positions.map(p => ({
          ...p,
          entryPrice: p.entryPrice.toFixed(2),
          currentPrice: p.currentPrice.toFixed(2),
          pnl: p.pnl.toFixed(2),
        }))}
      />
    </div>
  );
};

export default Positions;
