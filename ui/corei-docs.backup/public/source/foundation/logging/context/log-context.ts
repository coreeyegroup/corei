/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.01
 *
 * File        : log-context.ts
 * Purpose     : Platform Log Context.
 * =============================================================================
 */

import type { LogLevel } from "../state/log-level";

export interface LogContext {

    id: string;

    source: string;

    level: LogLevel;

    timestamp: Date;

}
