/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchResultsList.tsx
 * =============================================================================
 */

import React from "react";
import type { SearchResult } from "../services/search-adapter";
import { SearchResultBadge } from "./SearchResultBadge";

export interface SearchResultsListProps {
  results: readonly SearchResult[];
  selected?: SearchResult;
  onSelect: (result: SearchResult) => void;
}

export function SearchResultsList({ results, selected, onSelect }: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-auto">
      {results.map(result => (
        <button
          key={result.id}
          type="button"
          onClick={() => onSelect(result)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.id === result.id ? "bg-blue-50" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium text-sm">{result.title}</div>
            <SearchResultBadge type={result.type} />
          </div>
          <div className="text-xs text-gray-500">{result.subtitle}</div>
          <div className="mt-1 text-xs truncate text-gray-600">{result.description}</div>
        </button>
      ))}
    </div>
  );
}
