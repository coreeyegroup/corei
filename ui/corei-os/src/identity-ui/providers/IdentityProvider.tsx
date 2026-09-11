// src/identity-ui/providers/IdentityProvider.tsx
/**
 * COREI – Identity Provider
 * Stage-25 / Phase-23
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { IdentityRuntime } from '../../identity/runtime/IdentityRuntime';

const IdentityContext = createContext<IdentityRuntime | null>(null);

interface IdentityProviderProps {
  runtime: IdentityRuntime;
  children: ReactNode;
}

export const IdentityProvider: React.FC<IdentityProviderProps> = ({ runtime, children }) => {
  return (
    <IdentityContext.Provider value={runtime}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = (): IdentityRuntime => {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
};
