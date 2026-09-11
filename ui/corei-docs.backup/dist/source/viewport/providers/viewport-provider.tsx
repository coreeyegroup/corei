/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.06
 *
 * File        : viewport-provider.tsx
 * Purpose     : Institutional Viewport Provider
 * =============================================================================
 */

import {

    createContext,
    useContext,
    type PropsWithChildren

} from "react";

import type { ViewportManager } from "../manager";

const ViewportContext =

    createContext<ViewportManager | null>(

        null

    );

export interface ViewportProviderProperties
extends PropsWithChildren {

    readonly manager: ViewportManager;

}

export function ViewportProvider({

    manager,

    children

}: ViewportProviderProperties) {

    return (

        <ViewportContext.Provider
            value={manager}
        >

            {children}

        </ViewportContext.Provider>

    );

}

export function useViewport(): ViewportManager {

    const manager =

        useContext(

            ViewportContext

        );

    if (!manager) {

        throw new Error(

            "ViewportProvider is not initialized."

        );

    }

    return manager;

}
