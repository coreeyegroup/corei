/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface ProviderSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProviderSearch({ value, onChange, placeholder = "Search capability or provider..." }: ProviderSearchProps) {
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
