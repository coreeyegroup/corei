/**
 * =============================================================================
 * COREI Runtime Context
 * =============================================================================
 */

import type { RuntimeState } from "../state/runtime-state";

export interface RuntimeContext {

    id: string;

    state: RuntimeState;

    startedAt: Date;

}
