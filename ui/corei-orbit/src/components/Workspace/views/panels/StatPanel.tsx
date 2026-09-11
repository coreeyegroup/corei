// src/components/Workspace/views/panels/StatPanel.tsx
import React from 'react';

interface StatPanelProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'green' | 'red' | 'amber' | 'blue' | 'default';
}

const StatPanel: React.FC<StatPanelProps> = ({ label, value, unit, color = 'default' }) => {
  const valueClass = color !== 'default' ? `stat-value ${color}` : 'stat-value';
  return (
    <div className="panel stat-panel">
      <span className="panel-label">{label}</span>
      <span className={valueClass}>
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
      </span>
    </div>
  );
};

export default StatPanel;
