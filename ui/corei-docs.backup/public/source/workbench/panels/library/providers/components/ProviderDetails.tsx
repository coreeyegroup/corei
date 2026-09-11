/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderExplorerItem } from "../services/provider-explorer-adapter";
import { ProviderStatusBadge } from "../ProviderStatusBadge";

export interface ProviderDetailsProps {
  provider: ProviderExplorerItem | null;
}

export function ProviderDetails({ provider }: ProviderDetailsProps) {
  if (!provider) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a provider to view details
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
          <p className="text-sm text-gray-500">{provider.vendor}</p>
        </div>
        <ProviderStatusBadge enabled={provider.enabled} />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Version</dt>
            <dd className="text-gray-900">{provider.version}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Type</dt>
            <dd className="text-gray-900">{provider.type}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Enabled</dt>
            <dd className="text-gray-900">{provider.enabled ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Runtime Status</dt>
            <dd className="text-gray-900">{provider.runtimeStatus}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
