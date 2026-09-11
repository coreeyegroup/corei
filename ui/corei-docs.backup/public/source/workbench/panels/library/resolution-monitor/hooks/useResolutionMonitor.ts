/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : useResolutionMonitor.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { resolutionMonitorAdapter } from "../services/resolution-monitor-adapter";
import type { ResolutionMonitorItem } from "../services/resolution-monitor-adapter";

export interface ResolutionMonitorState {
  readonly search: string;
  readonly items: readonly ResolutionMonitorItem[];
  readonly selected?: ResolutionMonitorItem;
  setSearch(value: string): void;
  select(item: ResolutionMonitorItem): void;
}

export function useResolutionMonitor(): ResolutionMonitorState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ResolutionMonitorItem | undefined>();

  const items = useMemo(
    () => resolutionMonitorAdapter.search(search),
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
