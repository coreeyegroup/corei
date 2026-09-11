/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilitySearch.tsx
 * Purpose     : Search input for Capability Explorer
 */
import React from "react";

export interface CapabilitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CapabilitySearch({ value, onChange, placeholder = "Search capabilities..." }: CapabilitySearchProps) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">🔍</span>
    </div>
  );
}
