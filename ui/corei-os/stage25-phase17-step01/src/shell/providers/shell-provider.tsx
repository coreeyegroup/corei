/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 01
 * Build Unit  : 01.11
 *
 * File        : shell-provider.tsx
 * Purpose     : Institutional Shell Provider
 * =============================================================================
 */

import {

    createContext,
    useContext,
    type PropsWithChildren

} from "react";

import type { ShellManager } from "../manager/shell-manager";

const ShellContext = createContext<ShellManager | null>(null);

export interface ShellProviderProperties
extends PropsWithChildren {

    readonly manager: ShellManager;

}

export function ShellProvider({

    manager,

    children

}: ShellProviderProperties) {

    return (

        <ShellContext.Provider value={manager}>

            {children}

        </ShellContext.Provider>

    );

}

export function useShell(): ShellManager {

    const manager = useContext(

        ShellContext

    );

    if (!manager) {

        throw new Error(

            "ShellProvider is not initialized."

        );

    }

    return manager;

}
