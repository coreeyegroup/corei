/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 10
 * Build Unit  : 07
 *
 * File        : monitor-provider.tsx
 * Purpose     : Institutional Monitor Provider
 * =============================================================================
 */

import {

    createContext,
    useContext,
    type PropsWithChildren

} from "react";

import type {

    MonitorManager

} from "../manager";

const MonitorContext =

    createContext<MonitorManager | null>(

        null

    );

export interface MonitorProviderProperties
extends PropsWithChildren {

    readonly manager: MonitorManager;

}

export function MonitorProvider({

    manager,

    children

}: MonitorProviderProperties): React.JSX.Element {

    return (

        <MonitorContext.Provider
            value={manager}
        >

            {children}

        </MonitorContext.Provider>

    );

}

export function useMonitor(): MonitorManager {

    const manager =

        useContext(

            MonitorContext

        );

    if (!manager) {

        throw new Error(

            "MonitorProvider is not initialized."

        );

    }

    return manager;

}
