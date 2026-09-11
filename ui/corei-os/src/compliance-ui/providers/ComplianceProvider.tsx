// src/compliance-ui/providers/ComplianceProvider.tsx
/**
 * COREI – Compliance Provider
 * Stage-25 / Phase-25
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { ComplianceRuntime } from '../../compliance/runtime/ComplianceRuntime';

const ComplianceContext = createContext<ComplianceRuntime | null>(null);

interface ComplianceProviderProps {
  runtime: ComplianceRuntime;
  children: ReactNode;
}

export const ComplianceProvider: React.FC<ComplianceProviderProps> = ({ runtime, children }) => {
  return (
    <ComplianceContext.Provider value={runtime}>
      {children}
    </ComplianceContext.Provider>
  );
};

export const useCompliance = (): ComplianceRuntime => {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
};
