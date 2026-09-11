/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : ProviderBindingList.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderBindingInspectorItem } from "../services/provider-binding-inspector-adapter";

export interface ProviderBindingListProps {
  items: readonly ProviderBindingInspectorItem[];
  selected?: ProviderBindingInspectorItem;
  onSelect: (item: ProviderBindingInspectorItem) => void;
}

export function ProviderBindingList({ items, selected, onSelect }: ProviderBindingListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      {items.map(item => (
        <button
          key={`${item.capabilityId}:${item.providerId}`}
          type="button"
          onClick={() => onSelect(item)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.capabilityId === item.capabilityId && selected?.providerId === item.providerId ? "bg-blue-50" : ""}
          `}
        >
          <div className="font-medium">{item.capabilityId}</div>
          <div className="text-xs text-gray-500">{item.providerId}</div>
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs px-2 py-0.5 rounded ${item.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {item.enabled ? "Enabled" : "Disabled"}
            </span>
            <span className="text-xs">P{item.priority}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
