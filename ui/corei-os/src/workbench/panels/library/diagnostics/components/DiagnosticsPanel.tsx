/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : DiagnosticsPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useDiagnostics } from "../hooks/useDiagnostics";
import { DiagnosticsToolbar } from "./DiagnosticsToolbar";
import { DiagnosticsSearch } from "./DiagnosticsSearch";
import { DiagnosticsList } from "./DiagnosticsList";
import { DiagnosticsDetails } from "./DiagnosticsDetails";
import { DiagnosticsEmptyState } from "./DiagnosticsEmptyState";

export function DiagnosticsPanel() {
  const { search, items, selected, setSearch, select } = useDiagnostics();

  return (
    <div className="flex h-full flex-col">
      <DiagnosticsToolbar total={items.length} />

      <div className="p-3">
        <DiagnosticsSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {items.length === 0 ? (
        <DiagnosticsEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <DiagnosticsList
            items={items}
            selected={selected}
            onSelect={select}
          />
          <DiagnosticsDetails item={selected} />
        </div>
      )}
    </div>
  );
}
