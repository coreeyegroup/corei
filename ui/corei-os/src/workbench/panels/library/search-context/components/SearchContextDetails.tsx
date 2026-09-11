/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : SearchContextDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { SearchResult } from "../services/search-adapter";
import { SearchResultBadge } from "./SearchResultBadge";

export interface SearchContextDetailsProps {
  result?: SearchResult;
}

export function SearchContextDetails({ result }: SearchContextDetailsProps) {
  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a result to view context
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{result.title}</h3>
          <p className="text-sm text-gray-500">{result.subtitle}</p>
        </div>
        <SearchResultBadge type={result.type} />
      </div>

      <div className="border-t pt-4">
        <div className="text-sm">
          <dt className="font-medium text-gray-500">Description</dt>
          <dd className="text-gray-900 mt-1">{result.description}</dd>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-sm mb-2">Context</h4>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {result.context.capabilityId && (
            <div>
              <dt className="text-gray-500">Capability ID</dt>
              <dd className="text-gray-900 font-mono text-xs">{result.context.capabilityId}</dd>
            </div>
          )}
          {result.context.providerId && (
            <div>
              <dt className="text-gray-500">Provider ID</dt>
              <dd className="text-gray-900 font-mono text-xs">{result.context.providerId}</dd>
            </div>
          )}
          {result.context.status && (
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd className="text-gray-900">{result.context.status}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
