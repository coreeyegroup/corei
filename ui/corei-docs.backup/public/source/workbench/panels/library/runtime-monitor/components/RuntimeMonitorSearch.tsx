/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface RuntimeMonitorSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RuntimeMonitorSearch({ value, onChange, placeholder = "Search runtime items..." }: RuntimeMonitorSearchProps) {
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
