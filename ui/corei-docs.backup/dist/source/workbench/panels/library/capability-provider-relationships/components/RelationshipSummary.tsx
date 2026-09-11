/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipSummary.tsx
 * =============================================================================
 */

import React from "react";
import type { RelationshipItem } from "../services/relationship-explorer-adapter";

export interface RelationshipSummaryProps {
  items: RelationshipItem[];
}

export function RelationshipSummary({ items }: RelationshipSummaryProps) {
  const total = items.length;
  const enabled = items.filter(i => i.enabled).length;
  const disabled = total - enabled;

  return (
    <div className="flex gap-4 text-sm text-gray-600">
      <span>Total: {total}</span>
      <span className="text-green-600">Enabled: {enabled}</span>
      <span className="text-red-600">Disabled: {disabled}</span>
    </div>
  );
}
