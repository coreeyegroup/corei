// src/compliance-ui/index.ts
/**
 * COREI – Compliance UI Public API
 * Stage-25 / Phase-25
 */
export { ComplianceProvider, useCompliance } from './providers/ComplianceProvider';
export {
  useComplianceContext,
  useControls,
  useObligations,
  useEvidence,
  useExceptions,
  useMonitoring,
  useReporting,
} from './hooks';
export { ComplianceStatus } from './components/ComplianceStatus';
export { ComplianceDashboard } from './dashboards/ComplianceDashboard';
