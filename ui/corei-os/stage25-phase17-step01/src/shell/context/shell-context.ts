/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage-25
 * Phase-03
 * Step-01
 * Build Unit : 01.05
 *
 * Institutional Shell Context
 * =============================================================================
 */

import type { ShellModel } from "../models/shell";

export interface ShellContext {

    readonly shell: Readonly<ShellModel>;

}
