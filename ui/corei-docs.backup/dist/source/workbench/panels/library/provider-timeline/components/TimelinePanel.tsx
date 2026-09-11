/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelinePanel.tsx
 * =============================================================================
 */

import React from "react";
import { useProviderTimeline } from "../hooks/useProviderTimeline";
import { TimelineToolbar } from "./TimelineToolbar";
import { TimelineSearch } from "./TimelineSearch";
import { TimelineList } from "./TimelineList";
import { TimelineDetails } from "./TimelineDetails";
import { TimelineEmptyState } from "./TimelineEmptyState";

export function TimelinePanel() {
  const { search, items, selected, setSearch, select } = useProviderTimeline();

  return (
    <div className="flex h-full flex-col">
      <TimelineToolbar total={items.length} />

      <div className="p-3">
        <TimelineSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {items.length === 0 ? (
        <TimelineEmptyState />
      ) : (
        <div className="grid h-full grid-cols-2 gap-3 overflow-hidden px-3 pb-3">
          <TimelineList
            items={items}
            selected={selected}
            onSelect={select}
          />
          <TimelineDetails event={selected} />
        </div>
      )}
    </div>
  );
}
