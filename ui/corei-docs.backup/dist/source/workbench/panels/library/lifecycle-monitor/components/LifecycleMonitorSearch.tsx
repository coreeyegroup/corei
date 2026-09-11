/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleMonitorSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface LifecycleMonitorSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LifecycleMonitorSearch({ value, onChange, placeholder = "Search by name or ID..." }: LifecycleMonitorSearchProps) {
  return (
    <input
      type="text"
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
