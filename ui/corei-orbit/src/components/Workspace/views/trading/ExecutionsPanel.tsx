// src/components/Workspace/views/trading/ExecutionsPanel.tsx
import React from 'react';
import { useTradeStore } from '../../../../services/tradeService';
import { TablePanel } from '../panels';

const ExecutionsPanel: React.FC = () => {
  const { orders } = useTradeStore();
  const executions = orders.filter(o => o.status === 'FILLED');

  const columns = [
    { key: 'time', label: 'Time' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'side', label: 'Side' },
    { key: 'qty', label: 'Qty' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="panel-container">
      <h2>Executions</h2>
      <TablePanel
        columns={columns}
        data={executions.map(o => ({
          ...o,
          time: new Date(o.time).toLocaleTimeString(),
          price: o.price?.toFixed(2) || '—',
        }))}
      />
    </div>
  );
};

export default ExecutionsPanel;
