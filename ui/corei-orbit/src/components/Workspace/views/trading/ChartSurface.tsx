// src/components/Workspace/views/trading/ChartSurface.tsx
import React from 'react';
import { useMarketStore } from '../../../../services/marketDataService';

const ChartSurface: React.FC = () => {
  const instruments = useMarketStore((state) => state.instruments);
  // Use BTC/USD as default; could be made dynamic
  const btc = instruments['BTC/USD'];
  const history = btc?.history || [];

  return (
    <div className="chart-surface">
      <div className="chart-header">
        <span>BTC/USD</span>
        <span className="timeframe">1D</span>
      </div>
      <div className="chart-placeholder">
        {history.length > 1 ? (
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5A0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00E5A0" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polyline
              points={history.map((v, i) => `${(i / (history.length - 1)) * 400},${200 - (v / Math.max(...history)) * 180}`).join(' ')}
              fill="none"
              stroke="#00E5A0"
              strokeWidth="2"
            />
            <polygon
              points={`0,200 ${history.map((v, i) => `${(i / (history.length - 1)) * 400},${200 - (v / Math.max(...history)) * 180}`).join(' ')} 400,200`}
              fill="url(#chartGrad)"
            />
          </svg>
        ) : (
          <span>Loading chart…</span>
        )}
      </div>
    </div>
  );
};

export default ChartSurface;
