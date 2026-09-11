/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : CapabilityExplorerPanel.tsx
 * Purpose     : The main Capability Explorer panel component
 */
import React, { useState } from "react";
import { useCapabilityExplorer } from "./hooks/useCapabilityExplorer";
import { CapabilityExplorerToolbar } from "./components/CapabilityExplorerToolbar";
import { CapabilityCategoryTree } from "./components/CapabilityCategoryTree";
import { CapabilityList } from "./components/CapabilityList";
import { CapabilityDetails } from "./components/CapabilityDetails";
import { CapabilityEmptyState } from "./components/CapabilityEmptyState";

export function CapabilityExplorerPanel() {
  const {
    loading,
    allItems,
    filteredItems,
    selectedId,
    selectedItem,
    searchQuery,
    setSearchQuery,
    setSelectedId,
  } = useCapabilityExplorer();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter items by category
  const categoryFilteredItems = selectedCategory
    ? filteredItems.filter((item) => item.category === selectedCategory)
    : filteredItems;

  const handleRefresh = () => {
    // Force re-fetch by re-initializing the hook? For now, just reload.
    window.location.reload(); // Better to implement a proper refresh method.
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <CapabilityExplorerToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-gray-200 overflow-y-auto p-2">
          <CapabilityCategoryTree
            items={allItems}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 overflow-y-auto border-r border-gray-200">
            {categoryFilteredItems.length === 0 ? (
              <CapabilityEmptyState message="No capabilities match" />
            ) : (
              <CapabilityList
                items={categoryFilteredItems}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            )}
          </div>
          <div className="w-1/2 overflow-y-auto">
            <CapabilityDetails item={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
