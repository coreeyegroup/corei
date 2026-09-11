// src/governance-ui/dashboards/GovernanceDashboard.tsx
/**
 * COREI – Governance Dashboard
 * Stage-25 / Phase-24
 */
import React from 'react';
import { useGovernanceContext } from '../hooks/useGovernanceContext';
import { usePolicies } from '../hooks/usePolicies';
import { useApprovals } from '../hooks/useApprovals';
import { useWorkflows } from '../hooks/useWorkflows';
import { useCompliance } from '../hooks/useCompliance';

export const GovernanceDashboard: React.FC = () => {
  const context = useGovernanceContext();
  const { activePolicies } = usePolicies();
  const { pendingApprovals } = useApprovals();
  const { activeWorkflows } = useWorkflows();
  const { nonCompliant } = useCompliance();

  return (
    <div className="governance-dashboard">
      <h3>Governance Overview</h3>
      <div className="governance-stats">
        <div className="stat-item">
          <span className="stat-value">{context.policies.length}</span>
          <span className="stat-label">Total Policies</span>
          <span className="stat-sub">({activePolicies.length} active)</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{pendingApprovals.length}</span>
          <span className="stat-label">Pending Approvals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{activeWorkflows.length}</span>
          <span className="stat-label">Active Workflows</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{nonCompliant.length}</span>
          <span className="stat-label">Non-Compliant Items</span>
        </div>
      </div>
    </div>
  );
};
