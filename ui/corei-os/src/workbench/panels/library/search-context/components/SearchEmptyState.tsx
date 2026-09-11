/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <span className="text-4xl mb-2">🔍</span>
      <p className="text-lg font-medium">Search across the platform</p>
      <p className="text-sm">Find capabilities, providers, bindings, diagnostics, and events</p>
    </div>
  );
}
