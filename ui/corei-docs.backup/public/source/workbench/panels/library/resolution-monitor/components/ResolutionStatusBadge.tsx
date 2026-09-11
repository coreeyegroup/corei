/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface ResolutionStatusBadgeProps {
  status: "resolved" | "unresolved" | "no_binding";
}

export function ResolutionStatusBadge({ status }: ResolutionStatusBadgeProps) {
  const config = {
    resolved: { color: "bg-green-100 text-green-800", label: "Resolved" },
    unresolved: { color: "bg-yellow-100 text-yellow-800", label: "Unresolved" },
    no_binding: { color: "bg-gray-100 text-gray-800", label: "No Binding" },
  };

  const { color, label } = config[status];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
