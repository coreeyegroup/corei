/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionList.tsx
 * =============================================================================
 */

import React from "react";
import type { ResolutionMonitorItem } from "../services/resolution-monitor-adapter";
import { ResolutionStatusBadge } from "./ResolutionStatusBadge";

export interface ResolutionListProps {
  items: readonly ResolutionMonitorItem[];
  selected?: ResolutionMonitorItem;
  onSelect: (item: ResolutionMonitorItem) => void;
}

export function ResolutionList({ items, selected, onSelect }: ResolutionListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      {items.map(item => (
        <button
          key={item.capabilityId}
          type="button"
          onClick={() => onSelect(item)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.capabilityId === item.capabilityId ? "bg-blue-50" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">{item.capabilityName}</div>
            <ResolutionStatusBadge status={item.status} />
          </div>
          <div className="text-xs text-gray-500">{item.capabilityId}</div>
          <div className="mt-1 text-xs">
            {item.resolvedProviderName ? (
              <span>→ {item.resolvedProviderName}</span>
            ) : (
              <span className="text-gray-400">No provider</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
