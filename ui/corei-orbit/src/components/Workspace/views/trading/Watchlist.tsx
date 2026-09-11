// src/components/Workspace/views/trading/Watchlist.tsx
import React from 'react';
import { useMarketStore } from '../../../../services/marketDataService';

const Watchlist: React.FC = () => {
  const instruments = useMarketStore((state) => state.instruments);
  const symbols = Object.keys(instruments);

  return (
    <div className="watchlist">
      <h4>Watchlist</h4>
      <ul>
        {symbols.map((sym) => (
          <li key={sym}>
            <span className="symbol">{sym}</span>
            <span className="price">{instruments[sym].price?.toFixed(2) || '--'}</span>
            <span className={`change ${(instruments[sym].change || 0) >= 0 ? 'positive' : 'negative'}`}>
              {instruments[sym].change?.toFixed(2) || '0.00'}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
