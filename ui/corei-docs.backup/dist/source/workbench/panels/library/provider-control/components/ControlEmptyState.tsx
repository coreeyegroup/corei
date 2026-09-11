/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function ControlEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      No providers available for control.
    </div>
  );
}
