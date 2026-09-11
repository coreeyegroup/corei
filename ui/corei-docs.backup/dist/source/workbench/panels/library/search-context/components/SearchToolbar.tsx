/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchToolbar.tsx
 * =============================================================================
 */

import React from "react";

export interface SearchToolbarProps {
  total: number;
  query: string;
  onClear: () => void;
}

export function SearchToolbar({ total, query, onClear }: SearchToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
      <span className="text-sm font-medium">
        {query ? `${total} result${total !== 1 ? "s" : ""}` : "Search"}
      </span>
      {query && (
        <button
          onClick={onClear}
          className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}
