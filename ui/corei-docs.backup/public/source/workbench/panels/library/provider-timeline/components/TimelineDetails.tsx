/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : TimelineDetails.tsx
 * =============================================================================
 */

import React from "react";
import type { TimelineEvent } from "../services/provider-timeline-adapter";
import { TimelineEventBadge } from "./TimelineEventBadge";

export interface TimelineDetailsProps {
  event?: TimelineEvent;
}

export function TimelineDetails({ event }: TimelineDetailsProps) {
  if (!event) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an event to view details
      </div>
    );
  }

  const formatTime = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{event.providerName}</h3>
          <p className="text-sm text-gray-500">{event.providerId}</p>
        </div>
        <TimelineEventBadge eventType={event.eventType} />
      </div>

      <div className="border-t pt-4">
        <dl className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Event Type</dt>
            <dd className="text-gray-900 capitalize">{event.eventType}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Timestamp</dt>
            <dd className="text-gray-900">{formatTime(event.timestamp)}</dd>
          </div>
          {event.details && (
            <div>
              <dt className="font-medium text-gray-500">Details</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{event.details}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
