// src/infrastructure-integration-ui/providers/InfrastructureProvider.tsx
/**
 * COREI – Infrastructure Integration Provider
 * Stage-25 / Phase-26
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { InfrastructureRuntime } from '../../infrastructure-integration/runtime/InfrastructureRuntime';

const InfrastructureContext = createContext<InfrastructureRuntime | null>(null);

interface InfrastructureProviderProps {
  runtime: InfrastructureRuntime;
  children: ReactNode;
}

export const InfrastructureProvider: React.FC<InfrastructureProviderProps> = ({ runtime, children }) => {
  return (
    <InfrastructureContext.Provider value={runtime}>
      {children}
    </InfrastructureContext.Provider>
  );
};

export const useInfrastructure = (): InfrastructureRuntime => {
  const context = useContext(InfrastructureContext);
  if (!context) {
    throw new Error('useInfrastructure must be used within an InfrastructureProvider');
  }
  return context;
};
