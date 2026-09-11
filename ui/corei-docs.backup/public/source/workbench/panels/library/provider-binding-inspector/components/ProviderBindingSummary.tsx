/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderBindingSummary.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderBindingInspectorItem } from "../services/provider-binding-inspector-adapter";

export interface ProviderBindingSummaryProps {
  items: readonly ProviderBindingInspectorItem[];
}

export function ProviderBindingSummary({ items }: ProviderBindingSummaryProps) {
  const total = items.length;
  const enabled = items.filter(i => i.enabled).length;
  const disabled = total - enabled;

  return (
    <div className="flex gap-4 text-sm">
      <span>Total: <strong>{total}</strong></span>
      <span>Enabled: <strong className="text-green-600">{enabled}</strong></span>
      <span>Disabled: <strong className="text-red-600">{disabled}</strong></span>
    </div>
  );
}
