/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelineEventBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface TimelineEventBadgeProps {
  eventType: "registered" | "activated" | "deactivated" | "failed" | "recovered" | "updated";
}

export function TimelineEventBadge({ eventType }: TimelineEventBadgeProps) {
  const config = {
    registered: { color: "bg-blue-100 text-blue-800", label: "Registered" },
    activated: { color: "bg-green-100 text-green-800", label: "Activated" },
    deactivated: { color: "bg-gray-100 text-gray-800", label: "Deactivated" },
    failed: { color: "bg-red-100 text-red-800", label: "Failed" },
    recovered: { color: "bg-green-100 text-green-800", label: "Recovered" },
    updated: { color: "bg-yellow-100 text-yellow-800", label: "Updated" },
  };

  const { color, label } = config[eventType] || config.registered;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
