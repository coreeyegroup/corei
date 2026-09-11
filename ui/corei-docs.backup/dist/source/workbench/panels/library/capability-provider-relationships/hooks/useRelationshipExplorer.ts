/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : useRelationshipExplorer.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { relationshipExplorerAdapter, type RelationshipItem } from "../services/relationship-explorer-adapter";

export function useRelationshipExplorer() {
  const [allItems, setAllItems] = useState<RelationshipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<RelationshipItem | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const items = relationshipExplorerAdapter.load();
      setAllItems(items);
      if (items.length > 0 && !selectedItem) {
        setSelectedItem(items[0]);
      }
    } catch (error) {
      console.error("Failed to load relationships:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    return relationshipExplorerAdapter.search(searchQuery);
  }, [allItems, searchQuery]);

  return {
    loading,
    items: filteredItems,
    selected: selectedItem,
    search: searchQuery,
    setSearch: setSearchQuery,
    select: setSelectedItem,
  };
}
