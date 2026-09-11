/**
 * COREI OS — Stage 25 / Phase 03 / Step 07
 * Module: timeline-runtime
 * Layer: Runtime
 * Responsibility: timeline execution interface
 */

import { EventEngine } from "../engine/event-engine";
import { EventStore } from "../store/event-store";

export class TimelineRuntime {

  static emit(event: any) {

    const created = EventEngine.create(event);
    EventStore.add(created);

    return created;

  }

}
