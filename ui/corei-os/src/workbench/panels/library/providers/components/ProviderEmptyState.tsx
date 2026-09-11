/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export interface ProviderEmptyStateProps {
  message?: string;
}

export function ProviderEmptyState({ message = "No providers found" }: ProviderEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <span className="text-4xl mb-2">🔌</span>
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm">Try adjusting your search or refresh the registry.</p>
    </div>
  );
}
