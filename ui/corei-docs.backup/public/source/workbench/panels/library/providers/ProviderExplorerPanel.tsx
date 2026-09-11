/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * Component   : Provider Explorer
 * File        : ProviderExplorerPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useProviderExplorer } from "./hooks/useProviderExplorer";
import { ProviderExplorerToolbar } from "./components/ProviderExplorerToolbar";
import { ProviderCategoryTree } from "./components/ProviderCategoryTree";
import { ProviderList } from "./components/ProviderList";
import { ProviderDetails } from "./components/ProviderDetails";
import { ProviderEmptyState } from "./components/ProviderEmptyState";

export function ProviderExplorerPanel() {
  const {
    search,
    items,
    selected,
    setSearch,
    select,
  } = useProviderExplorer();

  const handleRefresh = () => {
    // TODO: implement proper refresh
    window.location.reload();
  };

  return (
    <div className="flex h-full flex-col">
      <ProviderExplorerToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onRefresh={handleRefresh}
      />

      {items.length === 0 ? (
        <ProviderEmptyState />
      ) : (
        <div className="flex min-h-0 flex-1">
          <aside
            className="
              flex
              min-w-[320px]
              max-w-[420px]
              basis-[340px]
              flex-col
              border-r
              border-border
            "
          >
            <ProviderCategoryTree total={items.length} />
            <ProviderList
              items={items}
              selectedId={selected?.id ?? null}
              onSelect={(id) => {
                const found = items.find(item => item.id === id);
                if (found) select(found);
              }}
            />
          </aside>
          <main className="min-w-0 flex-1 overflow-auto">
            <ProviderDetails provider={selected ?? null} />
          </main>
        </div>
      )}
    </div>
  );
}
