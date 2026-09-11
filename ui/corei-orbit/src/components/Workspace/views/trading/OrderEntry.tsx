// src/components/Workspace/views/trading/OrderEntry.tsx
import React, { useState } from 'react';

const OrderEntry: React.FC = () => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState('MARKET');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');

  const handleSubmit = () => {
    alert(`Order: ${side} ${qty} @ ${price || 'MARKET'}`);
  };

  return (
    <div className="order-entry">
      <h4>Order Entry</h4>
      <div className="side-selector">
        <button className={side === 'BUY' ? 'active buy' : 'buy'} onClick={() => setSide('BUY')}>BUY</button>
        <button className={side === 'SELL' ? 'active sell' : 'sell'} onClick={() => setSide('SELL')}>SELL</button>
      </div>
      <div className="field">
        <label>Order Type</label>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option>MARKET</option>
          <option>LIMIT</option>
          <option>STOP</option>
          <option>STOP_LIMIT</option>
        </select>
      </div>
      <div className="field">
        <label>Quantity</label>
        <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min={0.01} step={0.01} />
      </div>
      {orderType !== 'MARKET' && (
        <div className="field">
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step={0.01} />
        </div>
      )}
      <div className="field">
        <label>Stop Loss</label>
        <input type="number" value={sl} onChange={(e) => setSl(e.target.value)} step={0.01} placeholder="Optional" />
      </div>
      <div className="field">
        <label>Take Profit</label>
        <input type="number" value={tp} onChange={(e) => setTp(e.target.value)} step={0.01} placeholder="Optional" />
      </div>
      <div className="field">
        <label>Time in Force</label>
        <select>
          <option>DAY</option>
          <option>GTC</option>
          <option>IOC</option>
          <option>FOK</option>
        </select>
      </div>
      <div className="risk-check">
        <span>Risk Check: <strong className="pass">PASS</strong></span>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>SUBMIT ORDER</button>
    </div>
  );
};

export default OrderEntry;
