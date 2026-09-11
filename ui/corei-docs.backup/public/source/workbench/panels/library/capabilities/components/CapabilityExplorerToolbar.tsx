/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityExplorerToolbar.tsx
 * Purpose     : Toolbar for the Capability Explorer panel
 */
import React from "react";
import { CapabilitySearch } from "./CapabilitySearch";

export interface CapabilityExplorerToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export function CapabilityExplorerToolbar({
  searchValue,
  onSearchChange,
  onRefresh,
}: CapabilityExplorerToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
      <CapabilitySearch value={searchValue} onChange={onSearchChange} />
      <button
        onClick={onRefresh}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        🔄 Refresh
      </button>
    </div>
  );
}
