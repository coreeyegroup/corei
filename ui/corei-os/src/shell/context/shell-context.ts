/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 ******************************************************************************/

import { createContext } from "react";

import type { Shell } from "../models/shell";

export interface ShellContextValue {

    readonly shell: Shell | null;

}

export const ShellContext =
    createContext<ShellContextValue>({

        shell: null

    });
