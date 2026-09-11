// src/governance-ui/providers/GovernanceProvider.tsx
/**
 * COREI – Governance Provider
 * Stage-25 / Phase-24
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { GovernanceRuntime } from '../../governance/runtime/GovernanceRuntime';

const GovernanceContext = createContext<GovernanceRuntime | null>(null);

interface GovernanceProviderProps {
  runtime: GovernanceRuntime;
  children: ReactNode;
}

export const GovernanceProvider: React.FC<GovernanceProviderProps> = ({ runtime, children }) => {
  return (
    <GovernanceContext.Provider value={runtime}>
      {children}
    </GovernanceContext.Provider>
  );
};

export const useGovernance = (): GovernanceRuntime => {
  const context = useContext(GovernanceContext);
  if (!context) {
    throw new Error('useGovernance must be used within a GovernanceProvider');
  }
  return context;
};
