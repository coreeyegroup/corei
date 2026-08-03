/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityList.tsx
 * Purpose     : Renders a list of capability items
 */
import React from "react";
import type { CapabilityExplorerItem } from "../services/capability-explorer-adapter";
import { CapabilityStatusBadge } from "./CapabilityStatusBadge";
import { CapabilityEmptyState } from "./CapabilityEmptyState";  // <-- added import

export interface CapabilityListProps {
  items: CapabilityExplorerItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CapabilityList({ items, selectedId, onSelect }: CapabilityListProps) {
  if (items.length === 0) {
    return <CapabilityEmptyState />;
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
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>
            <CapabilityStatusBadge status={item.status} availability={item.availability} />
          </div>
          <div className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</div>
        </li>
      ))}
    </ul>
  );
}
