/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipList.tsx
 * =============================================================================
 */

import React from "react";
import type { RelationshipItem } from "../services/relationship-explorer-adapter";

export interface RelationshipListProps {
  items: RelationshipItem[];
  selected: RelationshipItem | null;
  onSelect: (item: RelationshipItem) => void;
}

export function RelationshipList({ items, selected, onSelect }: RelationshipListProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No relationships found
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item) => (
        <li
          key={`${item.capabilityId}:${item.providerId}`}
          className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
            selected?.capabilityId === item.capabilityId && selected?.providerId === item.providerId
              ? "bg-blue-50"
              : ""
          }`}
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{item.capabilityName}</div>
              <div className="text-sm text-gray-500">→ {item.providerName}</div>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                item.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {item.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-400">Priority: {item.priority}</div>
        </li>
      ))}
    </ul>
  );
}
