/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : useRuntimeMonitor.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { runtimeMonitorAdapter } from "../services/runtime-monitor-adapter";
import type { RuntimeMonitorItem } from "../services/runtime-monitor-adapter";

export interface RuntimeMonitorState {
  readonly search: string;
  readonly items: readonly RuntimeMonitorItem[];
  readonly selected?: RuntimeMonitorItem;
  setSearch(value: string): void;
  select(item: RuntimeMonitorItem): void;
}

export function useRuntimeMonitor(): RuntimeMonitorState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RuntimeMonitorItem | undefined>();

  const items = useMemo(
    () => runtimeMonitorAdapter.search(search),
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
