/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : useCapabilityExplorer.ts
 * Purpose     : React hook for Capability Explorer state and data
 */
import { useState, useEffect, useMemo } from "react";
import { capabilityExplorerAdapter } from "../services/capability-explorer-adapter";
import type { CapabilityExplorerItem } from "../services/capability-explorer-adapter";

export function useCapabilityExplorer() {
  const [allItems, setAllItems] = useState<CapabilityExplorerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const items = capabilityExplorerAdapter.getAllCapabilities();
      setAllItems(items);
      if (items.length > 0 && !selectedId) {
        setSelectedId(items[0].id);
      }
    } catch (error) {
      console.error("Failed to load capabilities:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, searchQuery]);

  const selectedItem = useMemo(
    () => allItems.find((item) => item.id === selectedId) || null,
    [allItems, selectedId]
  );

  return {
    loading,
    allItems,
    filteredItems,
    selectedId,
    selectedItem,
    searchQuery,
    setSearchQuery,
    setSelectedId,
  };
}
