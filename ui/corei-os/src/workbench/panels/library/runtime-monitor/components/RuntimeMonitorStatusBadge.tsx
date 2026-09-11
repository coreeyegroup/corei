/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface RuntimeMonitorStatusBadgeProps {
  state: "INITIALIZED" | "LOADED" | "ACTIVE" | "INACTIVE" | "ERROR";
}

export function RuntimeMonitorStatusBadge({ state }: RuntimeMonitorStatusBadgeProps) {
  const config = {
    ACTIVE: { color: "bg-green-100 text-green-800", label: "Active" },
    LOADED: { color: "bg-blue-100 text-blue-800", label: "Loaded" },
    INITIALIZED: { color: "bg-yellow-100 text-yellow-800", label: "Initialized" },
    INACTIVE: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
    ERROR: { color: "bg-red-100 text-red-800", label: "Error" },
  };

  const { color, label } = config[state] || config.INACTIVE;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
