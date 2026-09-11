/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { RuntimeMonitorItem } from "../services/runtime-monitor-adapter";
import { RuntimeMonitorStatusBadge } from "./RuntimeMonitorStatusBadge";

export interface RuntimeMonitorDetailsProps {
  item?: RuntimeMonitorItem;
}

export function RuntimeMonitorDetails({ item }: RuntimeMonitorDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an item to view details
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.id}</p>
        </div>
        <RuntimeMonitorStatusBadge state={item.state} />
      </div>

      <div className="border-t pt-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Type</dt>
            <dd className="text-gray-900">{item.type}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">State</dt>
            <dd className="text-gray-900">{item.state}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Initialized</dt>
            <dd className="text-gray-900">{item.initialized ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Loaded</dt>
            <dd className="text-gray-900">{item.loaded ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Active</dt>
            <dd className="text-gray-900">{item.active ? "Yes" : "No"}</dd>
          </div>
        </dl>
        <div className="mt-4 text-xs text-gray-500">
          Runtime state reflects the current provider readiness for operation.
        </div>
      </div>
    </div>
  );
}
