/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorList.tsx
 * =============================================================================
 */

import React from "react";
import type { RuntimeMonitorItem } from "../services/runtime-monitor-adapter";
import { RuntimeMonitorStatusBadge } from "./RuntimeMonitorStatusBadge";

export interface RuntimeMonitorListProps {
  items: readonly RuntimeMonitorItem[];
  selected?: RuntimeMonitorItem;
  onSelect: (item: RuntimeMonitorItem) => void;
}

export function RuntimeMonitorList({ items, selected, onSelect }: RuntimeMonitorListProps) {
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
            <RuntimeMonitorStatusBadge state={item.state} />
          </div>
          <div className="text-xs text-gray-500">{item.id}</div>
          <div className="mt-1 text-xs">
            {item.type} · {item.active ? "Active" : "Inactive"}
          </div>
        </button>
      ))}
    </div>
  );
}
