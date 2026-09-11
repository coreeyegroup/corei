/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityEmptyState.tsx
 * Purpose     : Shown when no capabilities match search or when the registry is empty
 */
import React from "react";

export interface CapabilityEmptyStateProps {
  message?: string;
}

export function CapabilityEmptyState({ message = "No capabilities found" }: CapabilityEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <span className="text-4xl mb-2">📦</span>
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm">Try adjusting your search or refresh the registry.</p>
    </div>
  );
}
