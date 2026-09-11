/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface LifecycleStatusBadgeProps {
  state: string;
  active: boolean;
}

export function LifecycleStatusBadge({ state, active }: LifecycleStatusBadgeProps) {
  let color = "bg-gray-100 text-gray-800";
  let label = state;

  if (state === "ACTIVE" && active) {
    color = "bg-green-100 text-green-800";
    label = "Active";
  } else if (state === "INITIALIZED") {
    color = "bg-blue-100 text-blue-800";
    label = "Initialized";
  } else if (state === "REGISTERED") {
    color = "bg-yellow-100 text-yellow-800";
    label = "Registered";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
