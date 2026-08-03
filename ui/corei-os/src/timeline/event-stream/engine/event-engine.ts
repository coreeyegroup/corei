/**
 * COREI OS — Stage 25 / Phase 03 / Step 07
 * Module: event-engine
 * Layer: Engine
 * Responsibility: event creation and dispatch logic
 */

import { TimelineEvent } from "../core/event-model";

export class EventEngine {

  static create(event: Omit<TimelineEvent, "id" | "timestamp">): TimelineEvent {

    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...event
    };

  }

}
