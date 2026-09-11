/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : useLifecycleMonitor.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { lifecycleMonitorAdapter } from "../services/lifecycle-monitor-adapter";
import type { LifecycleMonitorItem } from "../services/lifecycle-monitor-adapter";

export interface LifecycleMonitorState {
  readonly search: string;
  readonly items: readonly LifecycleMonitorItem[];
  readonly selected?: LifecycleMonitorItem;
  setSearch(value: string): void;
  select(item: LifecycleMonitorItem): void;
}

export function useLifecycleMonitor(): LifecycleMonitorState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LifecycleMonitorItem | undefined>();

  const items = useMemo(
    () => lifecycleMonitorAdapter.search(search),
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
