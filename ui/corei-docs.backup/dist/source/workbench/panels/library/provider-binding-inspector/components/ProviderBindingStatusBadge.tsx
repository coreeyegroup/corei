/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface ProviderStatusBadgeProps {
  enabled: boolean;
  runtimeStatus?: string;
}

export function ProviderStatusBadge({ enabled, runtimeStatus = "Operational" }: ProviderStatusBadgeProps) {
  let color = "bg-gray-500";
  let label = "Unknown";

  if (enabled && runtimeStatus === "Operational") {
    color = "bg-green-500";
    label = "Active";
  } else if (enabled && runtimeStatus !== "Operational") {
    color = "bg-yellow-500";
    label = "Degraded";
  } else if (!enabled) {
    color = "bg-red-500";
    label = "Disabled";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {label}
    </span>
  );
}
