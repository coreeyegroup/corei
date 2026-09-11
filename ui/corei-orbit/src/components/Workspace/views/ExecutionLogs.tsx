// src/components/Workspace/views/ExecutionLogs.tsx
import React, { useEffect } from 'react';
import { useTradeStore } from '../../../services/tradeService';
import { TablePanel } from './panels';

const ExecutionLogs: React.FC = () => {
  const { orders, fetchData } = useTradeStore();

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'time', label: 'Time' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'side', label: 'Side' },
    { key: 'qty', label: 'Qty' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
  ];

  const data = orders.map(o => ({
    ...o,
    time: new Date(o.time).toLocaleTimeString(),
  }));

  return (
    <div className="view-container">
      <h2 className="view-title">⎚ Execution Logs</h2>
      <TablePanel title="Recent Orders" columns={columns} data={data} />
    </div>
  );
};

export default ExecutionLogs;
