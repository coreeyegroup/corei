/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.01
 *
 * File        : extension-context.ts
 * Purpose     : Platform Extension Context.
 * =============================================================================
 */

import type { ExtensionState } from "../state/extension-state";

export interface ExtensionContext {

    id: string;

    name: string;

    state: ExtensionState;

    createdAt: Date;

}
