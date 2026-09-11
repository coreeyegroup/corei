/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchResultBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface SearchResultBadgeProps {
  type: "capability" | "provider" | "binding" | "diagnostic" | "event";
}

export function SearchResultBadge({ type }: SearchResultBadgeProps) {
  const config = {
    capability: { color: "bg-blue-100 text-blue-800", label: "Capability" },
    provider: { color: "bg-green-100 text-green-800", label: "Provider" },
    binding: { color: "bg-purple-100 text-purple-800", label: "Binding" },
    diagnostic: { color: "bg-yellow-100 text-yellow-800", label: "Diagnostic" },
    event: { color: "bg-orange-100 text-orange-800", label: "Event" },
  };

  const { color, label } = config[type] || config.capability;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
