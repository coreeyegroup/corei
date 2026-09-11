/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderExplorerToolbar.tsx
 * =============================================================================
 */

import React from "react";
import { ProviderSearch } from "../ProviderSearch";

export interface ProviderExplorerToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export function ProviderExplorerToolbar({
  searchValue,
  onSearchChange,
  onRefresh,
}: ProviderExplorerToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
      <ProviderSearch value={searchValue} onChange={onSearchChange} />
      <button
        onClick={onRefresh}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        🔄 Refresh
      </button>
    </div>
  );
}
