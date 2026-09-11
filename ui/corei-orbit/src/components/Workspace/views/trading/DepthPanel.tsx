// src/components/Workspace/views/trading/DepthPanel.tsx
import React from 'react';

// ─── Placeholder data – will be replaced by real depth provider in STEP 2 ──
const PLACEHOLDER_BIDS = [
  { price: 67450, size: 0.5 },
  { price: 67400, size: 1.2 },
  { price: 67350, size: 0.8 },
  { price: 67300, size: 2.1 },
];
const PLACEHOLDER_ASKS = [
  { price: 67550, size: 0.3 },
  { price: 67600, size: 0.9 },
  { price: 67650, size: 1.5 },
  { price: 67700, size: 0.7 },
];

const DepthPanel: React.FC = () => {
  // TODO: Replace with real depth data from market store / broker adapter
  // const depth = useMarketStore((state) => state.depth);
  const bids = PLACEHOLDER_BIDS;
  const asks = PLACEHOLDER_ASKS;

  return (
    <div className="depth-panel">
      <h4>Order Book</h4>
      <div className="depth-grid">
        <div className="bids">
          <div className="depth-row header"><span>Bid</span><span>Size</span></div>
          {bids.map((b, i) => (
            <div key={i} className="depth-row"><span>{b.price}</span><span>{b.size}</span></div>
          ))}
        </div>
        <div className="asks">
          <div className="depth-row header"><span>Ask</span><span>Size</span></div>
          {asks.map((a, i) => (
            <div key={i} className="depth-row"><span>{a.price}</span><span>{a.size}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepthPanel;
