/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlActions.tsx
 * =============================================================================
 */

import React from "react";

export interface ControlActionsProps {
  providerId: string;
  onInitialize: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onRefresh: (id: string) => void;
  onReconnect: (id: string) => void;
  canInitialize: boolean;
  canActivate: boolean;
  canDeactivate: boolean;
  canRefresh: boolean;
  canReconnect: boolean;
}

export function ControlActions({
  providerId,
  onInitialize,
  onActivate,
  onDeactivate,
  onRefresh,
  onReconnect,
  canInitialize,
  canActivate,
  canDeactivate,
  canRefresh,
  canReconnect,
}: ControlActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {canInitialize && (
        <button
          onClick={() => onInitialize(providerId)}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Initialize
        </button>
      )}
      {canActivate && (
        <button
          onClick={() => onActivate(providerId)}
          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          Activate
        </button>
      )}
      {canDeactivate && (
        <button
          onClick={() => onDeactivate(providerId)}
          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Deactivate
        </button>
      )}
      {canRefresh && (
        <button
          onClick={() => onRefresh(providerId)}
          className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Refresh
        </button>
      )}
      {canReconnect && (
        <button
          onClick={() => onReconnect(providerId)}
          className="px-3 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Reconnect
        </button>
      )}
    </div>
  );
}
