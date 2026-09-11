/**
 * COREI OS — Stage 25 / Phase 03 / Step 07
 * Module: event-store
 * Layer: Store
 * Responsibility: immutable event ledger
 */

import { TimelineEvent } from "../core/event-model";

export class EventStore {

  private static events: TimelineEvent[] = [];

  static add(event: TimelineEvent) {
    this.events.push(event);
  }

  static getAll(): TimelineEvent[] {
    return this.events;
  }

}
