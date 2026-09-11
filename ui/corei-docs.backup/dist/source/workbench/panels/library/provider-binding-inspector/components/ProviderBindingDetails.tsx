/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderBindingInspectorItem } from "../services/provider-binding-inspector-adapter";

export interface ProviderDetailsProps {
  binding?: ProviderBindingInspectorItem;
}

export function ProviderDetails({ binding }: ProviderDetailsProps) {
  if (!binding) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a binding to view details
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div>
        <strong>Capability</strong>
        <div>{binding.capabilityId}</div>
      </div>
      <div>
        <strong>Provider</strong>
        <div>{binding.providerId}</div>
      </div>
      <div>
        <strong>Priority</strong>
        <div>{binding.priority}</div>
      </div>
      <div>
        <strong>Binding Enabled</strong>
        <div>{binding.enabled ? "Yes" : "No"}</div>
      </div>
      <div>
        <strong>Selection Reason</strong>
        <div className="text-sm text-gray-500">
          Provider selection is determined by the registered binding priority together with the enabled flag.
          Additional lifecycle, runtime, policy and fallback metadata are not available in the current repository.
        </div>
      </div>
    </div>
  );
}
