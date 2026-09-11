/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : LifecycleMonitorPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useLifecycleMonitor } from "../hooks/useLifecycleMonitor";
import { LifecycleMonitorToolbar } from "./LifecycleMonitorToolbar";
import { LifecycleMonitorSearch } from "./LifecycleMonitorSearch";
import { LifecycleMonitorList } from "./LifecycleMonitorList";
import { LifecycleMonitorDetails } from "./LifecycleMonitorDetails";
import { LifecycleMonitorEmptyState } from "./LifecycleMonitorEmptyState";

export function LifecycleMonitorPanel() {
  const { search, items, selected, setSearch, select } = useLifecycleMonitor();

  return (
    <div className="flex h-full flex-col">
      <LifecycleMonitorToolbar total={items.length} />

      <div className="p-3">
        <LifecycleMonitorSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {items.length === 0 ? (
        <LifecycleMonitorEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <LifecycleMonitorList
            items={items}
            selected={selected}
            onSelect={select}
          />
          <LifecycleMonitorDetails item={selected} />
        </div>
      )}
    </div>
  );
}
