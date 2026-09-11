/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 ******************************************************************************/

import type { Shell } from "../models/shell";

export interface ShellState {

    readonly shell: Shell | null;

    readonly ready: boolean;

    readonly operational: boolean;

}

export const INITIAL_SHELL_STATE: ShellState = {

    shell: null,

    ready: false,

    operational: false

};
