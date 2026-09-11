/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : useSearchContext.ts
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { searchAdapter } from "../services/search-adapter";
import type { SearchResult } from "../services/search-adapter";

export interface SearchContextState {
  readonly query: string;
  readonly results: readonly SearchResult[];
  readonly selected?: SearchResult;
  setQuery(value: string): void;
  select(result: SearchResult): void;
  clear(): void;
  isSearching: boolean;
}

export function useSearchContext(): SearchContextState {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchResult | undefined>();
  const [isSearching, setIsSearching] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    setIsSearching(true);
    try {
      return searchAdapter.search(query);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  useEffect(() => {
    if (!results.length) {
      setSelected(undefined);
      return;
    }
    if (!selected) {
      setSelected(results[0]);
    }
  }, [results, selected]);

  const clear = () => {
    setQuery("");
    setSelected(undefined);
  };

  return {
    query,
    results,
    selected,
    setQuery,
    select: setSelected,
    clear,
    isSearching,
  };
}
