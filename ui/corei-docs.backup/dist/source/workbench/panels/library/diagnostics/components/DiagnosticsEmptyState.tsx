/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function DiagnosticsEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      No diagnostic data available.
    </div>
  );
}
