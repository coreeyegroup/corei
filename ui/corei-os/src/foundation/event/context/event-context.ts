/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.01
 *
 * File        : event-context.ts
 * Purpose     : Platform Event Context.
 * =============================================================================
 */

import type { EventState } from "../state/event-state";

export interface EventContext {

    id: string;

    name: string;

    state: EventState;

    createdAt: Date;

}
