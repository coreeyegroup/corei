/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * use-shell.ts
 *
 * PURPOSE:
 * Institutional Shell Hook
 *
 ******************************************************************************/

import { useContext } from "react";

import {
    ShellContext
} from "../context/shell-context";

import type {
    ShellContextValue
} from "../context/shell-context";

export function useShell(): ShellContextValue {

    const context = useContext(ShellContext);

    if (!context) {

        throw new Error(
            "useShell() must be used inside <ShellProvider>"
        );

    }

    return context;

}
