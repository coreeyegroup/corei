/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : RuntimeMonitorPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useRuntimeMonitor } from "../hooks/useRuntimeMonitor";
import { RuntimeMonitorToolbar } from "./RuntimeMonitorToolbar";
import { RuntimeMonitorSearch } from "./RuntimeMonitorSearch";
import { RuntimeMonitorSummary } from "./RuntimeMonitorSummary";
import { RuntimeMonitorList } from "./RuntimeMonitorList";
import { RuntimeMonitorDetails } from "./RuntimeMonitorDetails";
import { RuntimeMonitorEmptyState } from "./RuntimeMonitorEmptyState";

export function RuntimeMonitorPanel() {
  const { search, items, selected, setSearch, select } = useRuntimeMonitor();

  return (
    <div className="flex h-full flex-col">
      <RuntimeMonitorToolbar total={items.length} />

      <div className="p-3">
        <RuntimeMonitorSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="px-3 pb-2">
        <RuntimeMonitorSummary items={items} />
      </div>

      {items.length === 0 ? (
        <RuntimeMonitorEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <RuntimeMonitorList
            items={items}
            selected={selected}
            onSelect={select}
          />
          <RuntimeMonitorDetails item={selected} />
        </div>
      )}
    </div>
  );
}
