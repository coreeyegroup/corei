/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.01
 *
 * File        : kernel-context.ts
 * Purpose     : Authoritative Kernel context.
 * =============================================================================
 */

import type { KernelState } from "../state/kernel-state";

export interface KernelContext {

    id: string;

    state: KernelState;

    startedAt: Date;

}
