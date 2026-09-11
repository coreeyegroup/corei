/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityDetails.tsx
 * Purpose     : Shows full details of a selected capability
 */
import React from "react";
import type { CapabilityExplorerItem } from "../services/capability-explorer-adapter";
import { CapabilityStatusBadge } from "./CapabilityStatusBadge";

export interface CapabilityDetailsProps {
  item: CapabilityExplorerItem | null;
}

export function CapabilityDetails({ item }: CapabilityDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a capability to view details
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <CapabilityStatusBadge status={item.status} availability={item.availability} />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Version</dt>
            <dd className="text-gray-900">{item.version}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Owner</dt>
            <dd className="text-gray-900">{item.owner}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Description</dt>
            <dd className="text-gray-900">{item.description}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Dependencies</dt>
            <dd className="text-gray-900">
              {item.dependencies.length > 0 ? item.dependencies.join(", ") : "None"}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Runtime</dt>
            <dd className="text-gray-900">{item.runtimeSummary}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
