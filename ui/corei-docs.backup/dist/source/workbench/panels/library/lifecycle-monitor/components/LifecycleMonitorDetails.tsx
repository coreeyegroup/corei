/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleMonitorDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { LifecycleMonitorItem } from "../services/lifecycle-monitor-adapter";
import { LifecycleStatusBadge } from "./LifecycleStatusBadge";

export interface LifecycleMonitorDetailsProps {
  item?: LifecycleMonitorItem;
}

export function LifecycleMonitorDetails({ item }: LifecycleMonitorDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an item to view lifecycle details
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
        <LifecycleStatusBadge state={item.state} active={item.active} />
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
            <dt className="font-medium text-gray-500">Active</dt>
            <dd className="text-gray-900">{item.active ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Initialized</dt>
            <dd className="text-gray-900">{item.initialized ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Loaded</dt>
            <dd className="text-gray-900">{item.loaded ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
