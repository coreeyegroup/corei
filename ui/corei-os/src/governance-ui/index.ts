// src/governance-ui/index.ts
/**
 * COREI – Governance UI Public API
 * Stage-25 / Phase-24
 */
export { GovernanceProvider, useGovernance } from './providers/GovernanceProvider';
export { usePolicies, useApprovals, useWorkflows, useCompliance, useGovernanceContext } from './hooks';
export { GovernanceStatus } from './components/GovernanceStatus';
export { GovernanceDashboard } from './dashboards/GovernanceDashboard';
