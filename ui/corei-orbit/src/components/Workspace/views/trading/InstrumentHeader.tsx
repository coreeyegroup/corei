// src/components/Workspace/views/trading/InstrumentHeader.tsx

import React, { useState } from 'react';
import { useMarketStore } from '../../../../services/marketDataService';

const InstrumentHeader: React.FC = () => {
  const instruments = useMarketStore(
    (state) => state.instruments,
  );

  const [symbol, setSymbol] = useState('BTC/USD');

  const data = instruments[symbol];

  const symbols = Object.keys(instruments);

  const price = data?.price ?? 0;
  const change = data?.change ?? 0;

  const hasInstrument = Boolean(data);

  return (
    <div className="instrument-header">
      {/* ================================================================
          SYMBOL
      ================================================================ */}

      <div className="symbol-selector">
        <input
          type="text"
          value={symbol}
          onChange={(event) =>
            setSymbol(
              event.target.value.toUpperCase(),
            )
          }
          placeholder="Search symbol..."
          className="symbol-input"
          list="symbols"
          aria-label="Trading instrument"
        />

        <datalist id="symbols">
          {symbols.map((item) => (
            <option
              key={item}
              value={item}
            />
          ))}
        </datalist>
      </div>

      {/* ================================================================
          LAST PRICE
      ================================================================ */}

      <div className="price-display">
        <span className="last-price">
          {hasInstrument
            ? price.toFixed(2)
            : '—'}
        </span>

        <span
          className={`change ${
            change >= 0
              ? 'positive'
              : 'negative'
          }`}
        >
          {hasInstrument
            ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
            : '—'}
        </span>
      </div>

      {/* ================================================================
          MARKET DATA
      ================================================================ */}

      <div className="market-data-summary">
        <span className="market-data-label">
          Market Data
        </span>

        <span className="market-data-symbol">
          {symbol}
        </span>

        <span className="market-data-state">
          {hasInstrument
            ? 'AVAILABLE'
            : 'NO DATA'}
        </span>
      </div>
    </div>
  );
};

export default InstrumentHeader;
