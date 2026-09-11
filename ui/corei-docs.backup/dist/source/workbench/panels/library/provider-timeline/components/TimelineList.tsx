/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelineList.tsx
 * =============================================================================
 */

import React from "react";
import type { TimelineEvent } from "../services/provider-timeline-adapter";
import { TimelineEventBadge } from "./TimelineEventBadge";

export interface TimelineListProps {
  items: readonly TimelineEvent[];
  selected?: TimelineEvent;
  onSelect: (event: TimelineEvent) => void;
}

export function TimelineList({ items, selected, onSelect }: TimelineListProps) {
  const formatTime = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col overflow-auto">
      {items.map(event => (
        <button
          key={event.id}
          type="button"
          onClick={() => onSelect(event)}
          className={`
            w-full border-b px-3 py-2 text-left hover:bg-gray-100
            ${selected?.id === event.id ? "bg-blue-50" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium text-sm">{event.providerName}</div>
            <TimelineEventBadge eventType={event.eventType} />
          </div>
          <div className="text-xs text-gray-500">{formatTime(event.timestamp)}</div>
          <div className="mt-1 text-xs truncate">{event.details}</div>
        </button>
      ))}
    </div>
  );
}
