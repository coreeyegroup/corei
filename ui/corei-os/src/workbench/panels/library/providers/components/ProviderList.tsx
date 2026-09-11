/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderList.tsx
 * =============================================================================
 */

import React from "react";
import type { ProviderExplorerItem } from "../services/provider-explorer-adapter";
import { ProviderStatusBadge } from "../ProviderStatusBadge";
import { ProviderEmptyState } from "./ProviderEmptyState";

export interface ProviderListProps {
  items: readonly ProviderExplorerItem[];  // readonly to match hook
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProviderList({ items, selectedId, onSelect }: ProviderListProps) {
  if (items.length === 0) {
    return <ProviderEmptyState />;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item) => (
        <li
          key={item.id}
          className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedId === item.id ? "bg-blue-50" : ""}`}
          onClick={() => onSelect(item.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-500">{item.vendor}</div>
            </div>
            <ProviderStatusBadge enabled={item.enabled} />
          </div>
          <div className="mt-1 text-sm text-gray-600">{item.type}</div>
        </li>
      ))}
    </ul>
  );
}
