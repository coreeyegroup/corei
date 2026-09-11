/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipEmptyState.tsx
 * =============================================================================
 */

import React from "react";

export function RelationshipEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <span className="text-4xl mb-2">🔗</span>
      <p className="text-lg font-medium">No relationships found</p>
      <p className="text-sm">No capability-provider bindings have been registered yet.</p>
    </div>
  );
}
