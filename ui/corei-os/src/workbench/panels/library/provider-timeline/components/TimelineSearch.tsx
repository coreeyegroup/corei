/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelineSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface TimelineSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TimelineSearch({ value, onChange, placeholder = "Search events..." }: TimelineSearchProps) {
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
