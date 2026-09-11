/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorSummary.tsx
 * =============================================================================
 */

import React from "react";
import type { RuntimeMonitorItem } from "../services/runtime-monitor-adapter";

export interface RuntimeMonitorSummaryProps {
  items: readonly RuntimeMonitorItem[];
}

export function RuntimeMonitorSummary({ items }: RuntimeMonitorSummaryProps) {
  const total = items.length;
  const active = items.filter(i => i.active).length;
  const initialized = items.filter(i => i.initialized).length;
  const loaded = items.filter(i => i.loaded).length;
  const inactive = items.filter(i => i.state === "INACTIVE").length;

  return (
    <div className="flex gap-4 text-sm">
      <span>Total: <strong>{total}</strong></span>
      <span>Active: <strong className="text-green-600">{active}</strong></span>
      <span>Initialized: <strong className="text-blue-600">{initialized}</strong></span>
      <span>Loaded: <strong className="text-purple-600">{loaded}</strong></span>
      <span>Inactive: <strong className="text-gray-600">{inactive}</strong></span>
    </div>
  );
}
