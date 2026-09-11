// src/identity-ui/components/OrganizationDisplay.tsx
/**
 * COREI – Organization Display Component
 * Stage-25 / Phase-23
 */
import React from 'react';
import { useOrganization } from '../hooks/useOrganization';

export const OrganizationDisplay: React.FC = () => {
  const { institution, organization, team } = useOrganization();
  return (
    <div className="identity-org-display">
      <span>{institution?.name || 'No Institution'}</span>
      {' / '}
      <span>{organization?.name || 'No Organization'}</span>
      {team && <span> / {team.name}</span>}
    </div>
  );
};
