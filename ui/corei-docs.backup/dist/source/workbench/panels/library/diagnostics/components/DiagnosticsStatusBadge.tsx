/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsStatusBadge.tsx
 * =============================================================================
 */

import React from "react";

export interface DiagnosticsStatusBadgeProps {
  status: "PASS" | "WARN" | "FAIL" | "UNKNOWN";
}

export function DiagnosticsStatusBadge({ status }: DiagnosticsStatusBadgeProps) {
  const config = {
    PASS: { color: "bg-green-100 text-green-800", label: "PASS" },
    WARN: { color: "bg-yellow-100 text-yellow-800", label: "WARN" },
    FAIL: { color: "bg-red-100 text-red-800", label: "FAIL" },
    UNKNOWN: { color: "bg-gray-100 text-gray-800", label: "UNKNOWN" },
  };

  const { color, label } = config[status] || config.UNKNOWN;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
