/**
 * COREI OS — Stage 25 / Phase 03 / Step 07
 * Module: event-model
 * Layer: Core
 * Responsibility: deterministic event structure
 */

import { EventType } from "./event-types";

export interface TimelineEvent {
  id: string;
  type: EventType;
  source: string;
  payload: any;
  timestamp: number;
}
