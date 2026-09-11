/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : useProviderBindingInspector.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { providerBindingInspectorAdapter } from "../services/provider-binding-inspector-adapter";
import type { ProviderBindingInspectorItem } from "../services/provider-binding-inspector-adapter";

export interface ProviderBindingInspectorState {
  readonly search: string;
  readonly items: readonly ProviderBindingInspectorItem[];
  readonly selected?: ProviderBindingInspectorItem;
  setSearch(value: string): void;
  select(item: ProviderBindingInspectorItem): void;
}

export function useProviderBindingInspector(): ProviderBindingInspectorState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ProviderBindingInspectorItem | undefined>();

  const items = useMemo(
    () => providerBindingInspectorAdapter.search(search),
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
