/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipExplorerToolbar.tsx
 * =============================================================================
 */

import React from "react";

export interface RelationshipExplorerToolbarProps {
  total: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export function RelationshipExplorerToolbar({
  total,
  searchValue,
  onSearchChange,
  onRefresh,
}: RelationshipExplorerToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search relationships..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button
        onClick={onRefresh}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        🔄 Refresh
      </button>
      <span className="text-sm text-gray-500">{total} relationships</span>
    </div>
  );
}
