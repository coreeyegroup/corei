// src/identity-ui/components/RoleDisplay.tsx
/**
 * COREI – Role Display Component
 * Stage-25 / Phase-23
 */
import React from 'react';
import { useRole } from '../hooks/useRole';

export const RoleDisplay: React.FC = () => {
  const { role, permissions } = useRole();
  return (
    <div className="identity-role-display">
      <span>Role: {role?.name || 'None'}</span>
      <span> ({permissions.length} permissions)</span>
    </div>
  );
};
