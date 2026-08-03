/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.01
 *
 * File        : registry-context.ts
 * Purpose     : Registry execution context.
 * =============================================================================
 */

import type { RegistryState } from "../state/registry-state";

export interface RegistryContext {

    id: string;

    name: string;

    state: RegistryState;

    createdAt: Date;

}
