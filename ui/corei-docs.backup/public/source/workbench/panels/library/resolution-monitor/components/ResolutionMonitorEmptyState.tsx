/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function ResolutionEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      No resolution data available.
    </div>
  );
}
