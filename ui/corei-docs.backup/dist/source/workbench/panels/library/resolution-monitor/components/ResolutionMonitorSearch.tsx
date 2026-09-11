/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface ResolutionSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ResolutionSearch({ value, onChange, placeholder = "Search capability or provider..." }: ResolutionSearchProps) {
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
