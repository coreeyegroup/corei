/**
 * COREI – Intelligence Provider
 * Stage-25 / Phase-22
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { IntelligenceRuntime } from '../runtime/intelligence-runtime';

const IntelligenceContext = createContext<IntelligenceRuntime | null>(null);

interface IntelligenceProviderProps {
  runtime: IntelligenceRuntime;
  children: ReactNode;
}

export const IntelligenceProvider: React.FC<IntelligenceProviderProps> = ({ runtime, children }) => {
  console.log('[IntelligenceProvider] runtime received:', runtime);
  if (!runtime) {
    console.warn('[IntelligenceProvider] runtime is null/undefined!');
  }
  return (
    <IntelligenceContext.Provider value={runtime}>
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = (): IntelligenceRuntime => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};
