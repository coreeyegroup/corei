/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityCategoryTree.tsx
 * Purpose     : Renders a list of capability categories with counts
 */
import React, { useMemo } from "react";
import type { CapabilityExplorerItem } from "../services/capability-explorer-adapter";

export interface CapabilityCategoryTreeProps {
  items: CapabilityExplorerItem[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CapabilityCategoryTree({
  items,
  selectedCategory,
  onSelectCategory,
}: CapabilityCategoryTreeProps) {
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  return (
    <div className="space-y-1">
      <button
        className={`w-full text-left px-3 py-2 rounded-md text-sm ${!selectedCategory ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
        onClick={() => onSelectCategory(null)}
      >
        All ({items.length})
      </button>
      {categoryCounts.map(([category, count]) => (
        <button
          key={category}
          className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedCategory === category ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
          onClick={() => onSelectCategory(category)}
        >
          {category} ({count})
        </button>
      ))}
    </div>
  );
}
