/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : ControlPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useProviderControl } from "../hooks/useProviderControl";
import { ControlToolbar } from "./ControlToolbar";
import { ControlSearch } from "./ControlSearch";
import { ControlList } from "./ControlList";
import { ControlDetails } from "./ControlDetails";
import { ControlEmptyState } from "./ControlEmptyState";

export function ControlPanel() {
  const {
    search,
    items,
    selected,
    setSearch,
    select,
    initialize,
    activate,
    deactivate,
    refresh,
    reconnect,
  } = useProviderControl();

  return (
    <div className="flex h-full flex-col">
      <ControlToolbar total={items.length} />

      <div className="p-3">
        <ControlSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {items.length === 0 ? (
        <ControlEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <ControlList
            items={items}
            selected={selected}
            onSelect={select}
            onInitialize={initialize}
            onActivate={activate}
            onDeactivate={deactivate}
            onRefresh={refresh}
            onReconnect={reconnect}
          />
          <ControlDetails
            item={selected}
            onInitialize={initialize}
            onActivate={activate}
            onDeactivate={deactivate}
            onRefresh={refresh}
            onReconnect={reconnect}
          />
        </div>
      )}
    </div>
  );
}
