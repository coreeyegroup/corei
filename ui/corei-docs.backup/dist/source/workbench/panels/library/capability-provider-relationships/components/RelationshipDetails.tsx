/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { RelationshipItem } from "../services/relationship-explorer-adapter";

export interface RelationshipDetailsProps {
  item: RelationshipItem | null;
}

export function RelationshipDetails({ item }: RelationshipDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a relationship to view details
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Capability ↔ Provider Binding</h2>

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="font-medium text-gray-500">Capability ID</dt>
          <dd className="text-gray-900">{item.capabilityId}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Capability Name</dt>
          <dd className="text-gray-900">{item.capabilityName}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Provider ID</dt>
          <dd className="text-gray-900">{item.providerId}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Provider Name</dt>
          <dd className="text-gray-900">{item.providerName}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Priority</dt>
          <dd className="text-gray-900">{item.priority}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Enabled</dt>
          <dd className="text-gray-900">{item.enabled ? "Yes" : "No"}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-medium text-gray-500">Status</dt>
          <dd className="text-gray-900">{item.status}</dd>
        </div>
      </dl>
    </div>
  );
}
