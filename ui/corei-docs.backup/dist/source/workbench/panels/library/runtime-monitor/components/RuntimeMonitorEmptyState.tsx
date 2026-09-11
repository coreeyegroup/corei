/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function RuntimeMonitorEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      No runtime data available.
    </div>
  );
}
