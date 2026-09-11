// src/components/Workspace/views/trading/OrdersPanel.tsx
import React, { useState } from 'react';
import { useTradeStore } from '../../../../services/tradeService';
import { TablePanel } from '../panels';

const OrdersPanel: React.FC = () => {
  const { orders } = useTradeStore();
  const [filter, setFilter] = useState('');

  const filtered = orders.filter(o =>
    o.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'side', label: 'Side' },
    { key: 'qty', label: 'Qty' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>Orders</h2>
        <input
          type="text"
          placeholder="Filter by symbol..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <TablePanel
        columns={columns}
        data={filtered.map(o => ({
          ...o,
          price: o.price?.toFixed(2) || '—',
        }))}
      />
    </div>
  );
};

export default OrdersPanel;
