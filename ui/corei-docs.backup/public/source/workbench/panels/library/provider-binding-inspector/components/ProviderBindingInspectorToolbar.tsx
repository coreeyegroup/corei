/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderBindingInspectorToolbar.tsx
 * =============================================================================
 */

import React from "react";

export interface ProviderBindingInspectorToolbarProps {
  total: number;
}

export function ProviderBindingInspectorToolbar({ total }: ProviderBindingInspectorToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
      <span className="text-sm font-medium">Bindings ({total})</span>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        🔄 Refresh
      </button>
    </div>
  );
}
