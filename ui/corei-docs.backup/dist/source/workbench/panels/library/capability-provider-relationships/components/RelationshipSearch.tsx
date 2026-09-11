/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Relationship Explorer
 * File        : RelationshipSearch.tsx
 * =============================================================================
 */

import React from "react";

export interface RelationshipSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RelationshipSearch({ value, onChange, placeholder = "Search relationships..." }: RelationshipSearchProps) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
