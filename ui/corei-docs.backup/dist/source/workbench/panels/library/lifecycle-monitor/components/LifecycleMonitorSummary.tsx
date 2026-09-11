/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleMonitorSummary.tsx
 * =============================================================================
 */

import React from "react";
import type { LifecycleMonitorItem } from "../services/lifecycle-monitor-adapter";

export interface LifecycleMonitorSummaryProps {
  items: readonly LifecycleMonitorItem[];
}

export function LifecycleMonitorSummary({ items }: LifecycleMonitorSummaryProps) {
  const total = items.length;
  const active = items.filter(i => i.active).length;
  const initialized = items.filter(i => i.initialized).length;
  const loaded = items.filter(i => i.loaded).length;

  return (
    <div className="flex gap-4 text-sm">
      <span>Total: <strong>{total}</strong></span>
      <span>Active: <strong className="text-green-600">{active}</strong></span>
      <span>Initialized: <strong className="text-blue-600">{initialized}</strong></span>
      <span>Loaded: <strong className="text-purple-600">{loaded}</strong></span>
    </div>
  );
}
