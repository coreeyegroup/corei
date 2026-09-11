// src/compliance-ui/components/ComplianceStatus.tsx
/**
 * COREI – Compliance Status Component
 * Stage-25 / Phase-25
 */
import React from 'react';
import { useComplianceContext } from '../hooks/useComplianceContext';

export const ComplianceStatus: React.FC = () => {
  const context = useComplianceContext();
  return (
    <div className="compliance-status">
      <span>Controls: {context.controls.length}</span>
      {' | '}
      <span>Obligations: {context.obligations.length}</span>
      {' | '}
      <span>Evidence: {context.evidence.length}</span>
      {' | '}
      <span>Exceptions: {context.exceptions.length}</span>
    </div>
  );
};
