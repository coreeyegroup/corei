/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell.ts
 *
 * PURPOSE:
 * Institutional Shell Domain Model
 *
 ******************************************************************************/

import type {
    ShellContract,
    ShellStatus
} from "../contracts/shell-contract";

export interface Shell {

    readonly contract: ShellContract;

    readonly status: ShellStatus;

    readonly initialized: boolean;

    readonly started: boolean;

    readonly operational: boolean;

    readonly createdAt: Date;

    readonly updatedAt: Date;

}
