/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : useProviderTimeline.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { providerTimelineAdapter } from "../services/provider-timeline-adapter";
import type { TimelineEvent } from "../services/provider-timeline-adapter";

export interface ProviderTimelineState {
  readonly search: string;
  readonly items: readonly TimelineEvent[];
  readonly selected?: TimelineEvent;
  setSearch(value: string): void;
  select(event: TimelineEvent): void;
}

export function useProviderTimeline(): ProviderTimelineState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TimelineEvent | undefined>();

  const items = useMemo(
    () => providerTimelineAdapter.search(search),
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
