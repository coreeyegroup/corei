/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { ResolutionMonitorItem } from "../services/resolution-monitor-adapter";
import { ResolutionStatusBadge } from "./ResolutionStatusBadge";

export interface ResolutionDetailsProps {
  item?: ResolutionMonitorItem;
}

export function ResolutionDetails({ item }: ResolutionDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a resolution to view details
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{item.capabilityName}</h3>
          <p className="text-sm text-gray-500">{item.capabilityId}</p>
        </div>
        <ResolutionStatusBadge status={item.status} />
      </div>

      <div className="border-t pt-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Resolved Provider</dt>
            <dd className="text-gray-900">{item.resolvedProviderName || "None"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Provider ID</dt>
            <dd className="text-gray-900">{item.resolvedProviderId || "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Priority</dt>
            <dd className="text-gray-900">{item.priority !== null ? item.priority : "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Binding Enabled</dt>
            <dd className="text-gray-900">
              {item.bindingEnabled !== null ? (item.bindingEnabled ? "Yes" : "No") : "—"}
            </dd>
          </div>
        </dl>
        <div className="mt-4 text-xs text-gray-500">
          {item.status === "resolved" && "Resolution succeeded via binding priority."}
          {item.status === "unresolved" && "No enabled binding found for this capability."}
          {item.status === "no_binding" && "No binding registered for this capability."}
        </div>
      </div>
    </div>
  );
}
