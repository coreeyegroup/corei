/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function ProviderEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      No provider bindings available.
    </div>
  );
}
