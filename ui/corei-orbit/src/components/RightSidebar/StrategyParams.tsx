// src/components/RightSidebar/StrategyParams.tsx
import React, { useState, useEffect } from 'react';
import { useUiStore } from '../../store/uiStore';

// Mock strategy configurations
const strategyConfigs: Record<string, Record<string, any>> = {
  'Mean Reversion': {
    lookback: { label: 'Lookback Period', min: 5, max: 50, step: 1, default: 20 },
    threshold: { label: 'Entry Threshold', min: 0.5, max: 5, step: 0.1, default: 2.0 },
    lotSize: { label: 'Lot Size', min: 0.1, max: 5, step: 0.1, default: 0.5 },
  },
  'Scalping v2': {
    rsiPeriod: { label: 'RSI Period', min: 5, max: 20, step: 1, default: 14 },
    takeProfit: { label: 'Take Profit %', min: 0.5, max: 5, step: 0.5, default: 2 },
    stopLoss: { label: 'Stop Loss %', min: 0.5, max: 5, step: 0.5, default: 1.5 },
  },
  'Momentum Burst': {
    momentumPeriod: { label: 'Momentum Period', min: 5, max: 30, step: 1, default: 10 },
    volumeThreshold: { label: 'Volume Threshold', min: 100, max: 5000, step: 100, default: 1000 },
  },
};

const StrategyParams: React.FC = () => {
  const { strategyName } = useUiStore();
  const [params, setParams] = useState<Record<string, any>>({});

  // Load default params when strategy changes
  useEffect(() => {
    const config = strategyConfigs[strategyName];
    if (config) {
      const defaults: Record<string, any> = {};
      Object.entries(config).forEach(([key, value]) => {
        defaults[key] = value.default;
      });
      setParams(defaults);
    }
  }, [strategyName]);

  const handleChange = (key: string, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const config = strategyConfigs[strategyName];
  if (!config) {
    return <div className="prop-section">No parameters available for this strategy.</div>;
  }

  return (
    <div className="prop-section">
      <div className="prop-label">Strategy Parameters</div>
      {Object.entries(config).map(([key, meta]) => (
        <div key={key} style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
            {meta.label}
          </label>
          <input
            type="range"
            min={meta.min}
            max={meta.max}
            step={meta.step}
            value={params[key] || meta.default}
            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
            style={{ width: '100%', background: 'var(--bg-input)', accentColor: 'var(--accent-teal)' }}
          />
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>
            {params[key] !== undefined ? params[key] : meta.default}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StrategyParams;
