/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : RelationshipExplorerPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useRelationshipExplorer } from "../hooks/useRelationshipExplorer";
import { RelationshipExplorerToolbar } from "./RelationshipExplorerToolbar";
import { RelationshipList } from "./RelationshipList";
import { RelationshipDetails } from "./RelationshipDetails";
import { RelationshipEmptyState } from "./RelationshipEmptyState";
import { RelationshipSummary } from "./RelationshipSummary";

export function RelationshipExplorerPanel() {
  const {
    loading,
    items,
    selected,
    search,
    setSearch,
    select,
  } = useRelationshipExplorer();

  const handleRefresh = () => {
    window.location.reload(); // TODO: implement proper refresh
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading relationships...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <RelationshipExplorerToolbar
        total={items.length}
        searchValue={search}
        onSearchChange={setSearch}
        onRefresh={handleRefresh}
      />

      <div className="px-3 py-2 border-b border-gray-100">
        <RelationshipSummary items={items} />
      </div>

      {items.length === 0 ? (
        <RelationshipEmptyState />
      ) : (
        <div className="flex min-h-0 flex-1">
          <aside className="w-1/2 border-r border-gray-200 overflow-auto">
            <RelationshipList items={items} selected={selected} onSelect={select} />
          </aside>
          <main className="w-1/2 overflow-auto">
            <RelationshipDetails item={selected} />
          </main>
        </div>
      )}
    </div>
  );
}
