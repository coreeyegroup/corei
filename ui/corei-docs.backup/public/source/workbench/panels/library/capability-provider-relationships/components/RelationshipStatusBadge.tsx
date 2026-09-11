/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Relationship Explorer
 * File        : RelationshipStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface RelationshipStatusBadgeProps {
  enabled: boolean;
  resolved: boolean;
}

export function RelationshipStatusBadge({ enabled, resolved }: RelationshipStatusBadgeProps) {
  let color = "bg-gray-500";
  let label = "Unknown";

  if (enabled && resolved) {
    color = "bg-green-500";
    label = "Active";
  } else if (enabled && !resolved) {
    color = "bg-yellow-500";
    label = "Unresolved";
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
