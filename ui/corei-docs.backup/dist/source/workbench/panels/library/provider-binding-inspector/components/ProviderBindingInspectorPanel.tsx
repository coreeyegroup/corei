/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * File        : ProviderBindingInspectorPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useProviderBindingInspector } from "../hooks/useProviderBindingInspector";
import { ProviderBindingInspectorToolbar } from "./ProviderBindingInspectorToolbar";
import { ProviderSearch } from "./ProviderBindingSearch";
import { ProviderBindingSummary } from "./ProviderBindingSummary";
import { ProviderBindingList } from "./ProviderBindingList";
import { ProviderDetails } from "./ProviderBindingDetails";
import { ProviderEmptyState } from "./ProviderBindingEmptyState";

export function ProviderBindingInspectorPanel() {
  const inspector = useProviderBindingInspector();

  return (
    <div className="flex h-full flex-col">
      <ProviderBindingInspectorToolbar total={inspector.items.length} />

      <div className="p-3">
        <ProviderSearch
          value={inspector.search}
          onChange={inspector.setSearch}
        />
      </div>

      <div className="px-3 pb-3">
        <ProviderBindingSummary items={inspector.items} />
      </div>

      {inspector.items.length === 0 ? (
        <ProviderEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <ProviderBindingList
            items={inspector.items}
            selected={inspector.selected}
            onSelect={inspector.select}
          />
          <ProviderDetails binding={inspector.selected} />
        </div>
      )}
    </div>
  );
}
