/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsList.tsx
 * =============================================================================
 */

import React from "react";
import type { DiagnosticItem } from "../services/diagnostics-adapter";
import { DiagnosticsStatusBadge } from "./DiagnosticsStatusBadge";

export interface DiagnosticsListProps {
  items: readonly DiagnosticItem[];
  selected?: DiagnosticItem;
  onSelect: (item: DiagnosticItem) => void;
}

export function DiagnosticsList({ items, selected, onSelect }: DiagnosticsListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.id === item.id ? "bg-blue-50" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">{item.name}</div>
            <DiagnosticsStatusBadge status={item.status} />
          </div>
          <div className="text-xs text-gray-500">{item.type}</div>
          <div className="mt-1 text-xs truncate">{item.message}</div>
        </button>
      ))}
    </div>
  );
}
