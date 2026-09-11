/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface DiagnosticsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DiagnosticsSearch({ value, onChange, placeholder = "Search diagnostics..." }: DiagnosticsSearchProps) {
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
