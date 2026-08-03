/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.01
 *
 * File        : state-context.ts
 * Purpose     : Platform State context.
 * =============================================================================
 */

import type { PlatformState } from "../state/platform-state";

export interface StateContext {

    id: string;

    name: string;

    state: PlatformState;

    createdAt: Date;

}
