/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : ResolutionMonitorPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useResolutionMonitor } from "../hooks/useResolutionMonitor";
import { ResolutionMonitorToolbar } from "./ResolutionMonitorToolbar";
import { ResolutionSearch } from "./ResolutionMonitorSearch";
import { ResolutionList } from "./ResolutionMonitorList";
import { ResolutionDetails } from "./ResolutionMonitorDetails";
import { ResolutionEmptyState } from "./ResolutionMonitorEmptyState";

export function ResolutionMonitorPanel() {
  const { search, items, selected, setSearch, select } = useResolutionMonitor();

  return (
    <div className="flex h-full flex-col">
      <ResolutionMonitorToolbar total={items.length} />

      <div className="p-3">
        <ResolutionSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {items.length === 0 ? (
        <ResolutionEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <ResolutionList
            items={items}
            selected={selected}
            onSelect={select}
          />
          <ResolutionDetails item={selected} />
        </div>
      )}
    </div>
  );
}
