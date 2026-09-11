// src/infrastructure-integration-ui/components/InfrastructureStatus.tsx
/**
 * COREI – Infrastructure Status Component
 * Stage-25 / Phase-26
 */
import React from 'react';
import { useInfrastructureStatus } from '../hooks/useInfrastructureStatus';

export const InfrastructureStatus: React.FC = () => {
  const status = useInfrastructureStatus();
  return (
    <div className="infrastructure-status">
      <span>State: {status.runtimeState}</span>
      {' | '}
      <span>Integrations: {status.integrationCount}</span>
      {' | '}
      <span>Connectors: {status.connectorCount}</span>
      {' | '}
      <span>Health: {status.health}</span>
    </div>
  );
};
