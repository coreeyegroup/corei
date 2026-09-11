/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-08
 * Build Unit : BU-003
 * File       : window-lifecycle.ts
 * Purpose    : Institutional Window Lifecycle
 * =============================================================================
 */

import type {

    WindowBounds

} from "../contracts/window-contract";

import type {

    WindowModel

} from "../models/window";

import {

    windowRegistry

} from "../registry/window-registry";

import {

    windowRuntime

} from "../runtime/window-runtime";

export class WindowLifecycle {

    initialize(): void {

        windowRuntime.initialize();

    }

    register(

        window: WindowModel

    ): void {

        windowRegistry.register(

            window

        );

        windowRuntime.register(

            window

        );

    }

    unregister(

        id: string

    ): void {

        windowRuntime.unregister(

            id

        );

        windowRegistry.unregister(

            id

        );

    }

    activate(

        id: string

    ): void {

        if (

            !windowRegistry.exists(

                id

            )

        ) {

            return;

        }

        windowRuntime.activate(

            id

        );

    }

    deactivate(

        id: string

    ): void {

        windowRuntime.deactivate(

            id

        );

    }

    float(

        id: string,

        bounds: WindowBounds

    ): void {

        if (

            !windowRegistry.exists(

                id

            )

        ) {

            return;

        }

        windowRuntime.float(

            id,

            bounds

        );

    }

    dock(

        id: string

    ): void {

        if (

            !windowRegistry.exists(

                id

            )

        ) {

            return;

        }

        windowRuntime.dock(

            id

        );

    }

    getActiveWindow(): WindowModel | undefined {

        return windowRuntime.getActiveWindow();

    }

    getWindows(): readonly WindowModel[] {

        return windowRegistry.getAll();

    }

}

export const windowLifecycle =

    new WindowLifecycle();
