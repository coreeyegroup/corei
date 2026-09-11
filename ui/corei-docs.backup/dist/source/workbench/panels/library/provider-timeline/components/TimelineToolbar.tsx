/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelineToolbar.tsx
 * =============================================================================
 */

import React from "react";

export interface TimelineToolbarProps {
  total: number;
}

export function TimelineToolbar({ total }: TimelineToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
      <span className="text-sm font-medium">Provider Events ({total})</span>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        🔄 Refresh
      </button>
    </div>
  );
}
