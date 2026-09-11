/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchPanel.tsx
 * =============================================================================
 */

import React from "react";
import { useSearchContext } from "../hooks/useSearchContext";
import { SearchToolbar } from "./SearchToolbar";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultsList";
import { SearchContextDetails } from "./SearchContextDetails";
import { SearchEmptyState } from "./SearchEmptyState";

export function SearchPanel() {
  const { query, results, selected, setQuery, select, clear } = useSearchContext();

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <SearchInput
          value={query}
          onChange={setQuery}
        />
      </div>

      <SearchToolbar total={results.length} query={query} onClear={clear} />

      {!query && <SearchEmptyState />}

      {query && results.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          No results found for "{query}"
        </div>
      )}

      {query && results.length > 0 && (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <SearchResultsList
            results={results}
            selected={selected}
            onSelect={select}
          />
          <SearchContextDetails result={selected} />
        </div>
      )}
    </div>
  );
}
