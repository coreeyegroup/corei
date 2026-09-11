// src/components/Workspace/views/panels/TickerPanel.tsx
import React from 'react';

interface TickerData {
  symbol: string;
  price: string | number;
  change: string;
}

interface TickerPanelProps {
  tickers: TickerData[];
}

const TickerPanel: React.FC<TickerPanelProps> = ({ tickers }) => {
  return (
    <div className="panel ticker-panel">
      {tickers.map((ticker) => (
        <div key={ticker.symbol} className="ticker-item">
          <span className="ticker-symbol">{ticker.symbol}</span>
          <span className="ticker-price">{ticker.price}</span>
          <span className={`ticker-change ${ticker.change.startsWith('+') ? 'positive' : 'negative'}`}>
            {ticker.change}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TickerPanel;
