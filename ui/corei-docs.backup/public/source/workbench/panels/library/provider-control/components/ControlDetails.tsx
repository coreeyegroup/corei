/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderControlItem } from "../services/provider-control-adapter";
import { ControlStatusBadge } from "./ControlStatusBadge";
import { ControlActions } from "./ControlActions";

export interface ControlDetailsProps {
  item?: ProviderControlItem;
  onInitialize: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onRefresh: (id: string) => void;
  onReconnect: (id: string) => void;
}

export function ControlDetails({
  item,
  onInitialize,
  onActivate,
  onDeactivate,
  onRefresh,
  onReconnect,
}: ControlDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a provider to view controls
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
        <ControlStatusBadge enabled={item.enabled} />
      </div>

      <div className="border-t pt-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Type</dt>
            <dd className="text-gray-900">{item.type}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Status</dt>
            <dd className="text-gray-900">{item.enabled ? "Active" : "Inactive"}</dd>
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

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Controls</h4>
        <ControlActions
          providerId={item.id}
          onInitialize={onInitialize}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          onRefresh={onRefresh}
          onReconnect={onReconnect}
          canInitialize={item.canInitialize}
          canActivate={item.canActivate}
          canDeactivate={item.canDeactivate}
          canRefresh={item.canRefresh}
          canReconnect={item.canReconnect}
        />
      </div>
    </div>
  );
}
