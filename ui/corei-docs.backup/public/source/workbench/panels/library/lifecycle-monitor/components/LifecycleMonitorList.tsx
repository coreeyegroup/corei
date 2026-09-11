/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleMonitorList.tsx
 * =============================================================================
 */

import React from "react";
import type { LifecycleMonitorItem } from "../services/lifecycle-monitor-adapter";
import { LifecycleStatusBadge } from "./LifecycleStatusBadge";

export interface LifecycleMonitorListProps {
  items: readonly LifecycleMonitorItem[];
  selected?: LifecycleMonitorItem;
  onSelect: (item: LifecycleMonitorItem) => void;
}

export function LifecycleMonitorList({ items, selected, onSelect }: LifecycleMonitorListProps) {
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
            <LifecycleStatusBadge state={item.state} active={item.active} />
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
