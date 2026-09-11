/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : useProviderControl.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { providerControlAdapter } from "../services/provider-control-adapter";
import type { ProviderControlItem } from "../services/provider-control-adapter";

export interface ProviderControlState {
  readonly search: string;
  readonly items: readonly ProviderControlItem[];
  readonly selected?: ProviderControlItem;
  setSearch(value: string): void;
  select(item: ProviderControlItem): void;
  initialize(id: string): void;
  activate(id: string): void;
  deactivate(id: string): void;
  refresh(id: string): void;
  reconnect(id: string): void;
}

export function useProviderControl(): ProviderControlState {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ProviderControlItem | undefined>();

  const items = useMemo(
    () => providerControlAdapter.search(search),
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

  const initialize = (id: string) => {
    providerControlAdapter.initializeProvider(id);
    // In production: refresh the list after action
    // For now, we just reload the page to reflect changes
    window.location.reload();
  };

  const activate = (id: string) => {
    providerControlAdapter.activateProvider(id);
    window.location.reload();
  };

  const deactivate = (id: string) => {
    providerControlAdapter.deactivateProvider(id);
    window.location.reload();
  };

  const refresh = (id: string) => {
    providerControlAdapter.refreshProvider(id);
    // Don't reload for refresh, just update the list
    // For now, we reload to simulate state change
    window.location.reload();
  };

  const reconnect = (id: string) => {
    providerControlAdapter.reconnectProvider(id);
    window.location.reload();
  };

  return {
    search,
    items,
    selected,
    setSearch,
    select: setSelected,
    initialize,
    activate,
    deactivate,
    refresh,
    reconnect,
  };
}
