/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityStatusBadge.tsx
 * Purpose     : Renders a status badge for a capability
 */
import React from "react";

export interface CapabilityStatusBadgeProps {
  status: "active" | "inactive" | "unknown";
  availability: "available" | "unavailable" | "partial";
}

export function CapabilityStatusBadge({ status, availability }: CapabilityStatusBadgeProps) {
  let color = "bg-gray-500";
  let label = "Unknown";

  if (availability === "available" && status === "active") {
    color = "bg-green-500";
    label = "Active";
  } else if (availability === "partial" || status === "inactive") {
    color = "bg-yellow-500";
    label = "Degraded";
  } else if (availability === "unavailable") {
    color = "bg-red-500";
    label = "Unavailable";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {label}
    </span>
  );
}