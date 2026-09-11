// src/compliance-ui/dashboards/ComplianceDashboard.tsx
/**
 * COREI – Compliance Dashboard
 * Stage-25 / Phase-25
 */
import React from 'react';
import { useComplianceContext } from '../hooks/useComplianceContext';
import { useControls } from '../hooks/useControls';
import { useObligations } from '../hooks/useObligations';
import { useExceptions } from '../hooks/useExceptions';
import { useMonitoring } from '../hooks/useMonitoring';

export const ComplianceDashboard: React.FC = () => {
  const context = useComplianceContext();
  const { activeControls } = useControls();
  const { nonCompliant } = useObligations();
  const { openExceptions } = useExceptions();
  const { activeMonitors } = useMonitoring();

  return (
    <div className="compliance-dashboard">
      <h3>Compliance Overview</h3>
      <div className="compliance-stats">
        <div className="stat-item">
          <span className="stat-value">{context.controls.length}</span>
          <span className="stat-label">Total Controls</span>
          <span className="stat-sub">({activeControls.length} active)</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{nonCompliant.length}</span>
          <span className="stat-label">Non-Compliant Obligations</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{openExceptions.length}</span>
          <span className="stat-label">Open Exceptions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{activeMonitors.length}</span>
          <span className="stat-label">Active Monitors</span>
        </div>
      </div>
    </div>
  );
};
