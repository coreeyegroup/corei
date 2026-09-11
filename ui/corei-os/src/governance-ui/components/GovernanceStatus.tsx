// src/governance-ui/components/GovernanceStatus.tsx
/**
 * COREI – Governance Status Component
 * Stage-25 / Phase-24
 */
import React from 'react';
import { useGovernanceContext } from '../hooks/useGovernanceContext';

export const GovernanceStatus: React.FC = () => {
  const context = useGovernanceContext();
  return (
    <div className="governance-status">
      <span>Policies: {context.policies.length}</span>
      {' | '}
      <span>Decisions: {context.decisions.length}</span>
      {' | '}
      <span>Approvals: {context.approvals.length}</span>
      {' | '}
      <span>Workflows: {context.workflows.length}</span>
    </div>
  );
};
