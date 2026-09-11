/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : useDiagnostics.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { diagnosticsAdapter } from "../services/diagnostics-adapter";
import type { DiagnosticItem } from "../services/diagnostics-adapter";

export interface DiagnosticsState {
  readonly search: string;
  readonly items: readonly DiagnosticItem[];
  readonly selected?: DiagnosticItem;
  setSearch(value: string): void;
  select(item: DiagnosticItem): void;
}

export function useDiagnostics(): DiagnosticsState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DiagnosticItem | undefined>();

  const items = useMemo(
    () => diagnosticsAdapter.search(search),
    [search]
  );

  useEffect(() => {
    if (!items.length) {
      setSelected(undefined);
      return;
    }
    if (!selected) {
      setSelected(items[0]);
    }
  }, [items, selected]);

  return {
    search,
    items,
    selected,
    setSearch,
    select: setSelected,
  };
}
