/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { DiagnosticItem } from "../services/diagnostics-adapter";
import { DiagnosticsStatusBadge } from "./DiagnosticsStatusBadge";

export interface DiagnosticsDetailsProps {
  item?: DiagnosticItem;
}

export function DiagnosticsDetails({ item }: DiagnosticsDetailsProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a diagnostic item to view details
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.type}</p>
        </div>
        <DiagnosticsStatusBadge status={item.status} />
      </div>

      <div className="border-t pt-4">
        <dl className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Message</dt>
            <dd className="text-gray-900">{item.message}</dd>
          </div>
          {item.details && (
            <div>
              <dt className="font-medium text-gray-500">Details</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{item.details}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-gray-500">ID</dt>
            <dd className="text-gray-500 text-xs">{item.id}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
