/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-provider.tsx
 *
 * PURPOSE:
 * Institutional Shell Provider
 *
 * DESCRIPTION:
 * Creates the Shell Manager and owns deterministic
 * initialization and disposal across the React lifecycle.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import {

    createContext,

    useContext,

    useEffect,

    useMemo,

    type PropsWithChildren,

    type ReactElement

} from "react";

import {
    ShellManager
} from "../manager/shell-manager";

import type {
    ShellKernelContract
} from "../contracts/shell-kernel-contract";

const ShellManagerContext =
    createContext<ShellManager | null>(
        null
    );

export interface ShellProviderProps
    extends PropsWithChildren {

    readonly kernel:
        ShellKernelContract;

}

export function ShellProvider({

    kernel,

    children

}: ShellProviderProps): ReactElement {

    const manager =
        useMemo(
            () =>
                new ShellManager(
                    kernel
                ),
            [kernel]
        );

    useEffect(
        () => {

            manager.initialize();

            return () => {

                manager.dispose();

            };

        },
        [manager]
    );

    return (

        <ShellManagerContext.Provider
            value={manager}
        >

            {children}

        </ShellManagerContext.Provider>

    );

}

export function useShellManager():
    ShellManager {

    const manager =
        useContext(
            ShellManagerContext
        );

    if (
        !manager
    ) {

        throw new Error(
            "ShellProvider is missing."
        );

    }

    return manager;

}
