/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface ControlStatusBadgeProps {
  enabled: boolean;
}

export function ControlStatusBadge({ enabled }: ControlStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {enabled ? "Active" : "Inactive"}
    </span>
  );
}
