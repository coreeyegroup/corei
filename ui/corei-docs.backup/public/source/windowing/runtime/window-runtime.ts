/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-08
 * Build Unit : BU-001
 * File       : window-runtime.ts
 * Purpose    : Institutional Window Runtime
 * =============================================================================
 */

import type {

    WindowBounds

} from "../contracts/window-contract";

import type {

    WindowModel

} from "../models/window";

export interface WindowRuntime {

    readonly initialized: boolean;

    initialize(): void;

    register(

        window: WindowModel

    ): void;

    unregister(

        id: string

    ): void;

    activate(

        id: string

    ): void;

    deactivate(

        id: string

    ): void;

    float(

        id: string,

        bounds: WindowBounds

    ): void;

    dock(

        id: string

    ): void;

    getActiveWindow(): WindowModel | undefined;

    getWindows(): readonly WindowModel[];

}

class InstitutionalWindowRuntime implements WindowRuntime {

    private readonly windows =

        new Map<string, WindowModel>();

    private activeWindowId?: string;

    public initialized = false;

    initialize(): void {

        if (

            this.initialized

        ) {

            return;

        }

        this.initialized = true;

    }

    register(

        window: WindowModel

    ): void {

        this.windows.set(

            window.id,

            window

        );

    }

    unregister(

        id: string

    ): void {

        this.windows.delete(

            id

        );

        if (

            this.activeWindowId === id

        ) {

            this.activeWindowId = undefined;

        }

    }

    activate(

        id: string

    ): void {

        if (

            !this.windows.has(

                id

            )

        ) {

            return;

        }

        this.activeWindowId = id;

    }

    deactivate(

        id: string

    ): void {

        if (

            this.activeWindowId === id

        ) {

            this.activeWindowId = undefined;

        }

    }

    float(

        id: string,

        bounds: WindowBounds

    ): void {

        const window =

            this.windows.get(

                id

            );

        if (

            !window

        ) {

            return;

        }

        this.windows.set(

            id,

            {

                ...window,

                mode: "floating",

                bounds

            }

        );

    }

    dock(

        id: string

    ): void {

        const window =

            this.windows.get(

                id

            );

        if (

            !window

        ) {

            return;

        }

        this.windows.set(

            id,

            {

                ...window,

                mode: "docked"

            }

        );

    }

    getActiveWindow(): WindowModel | undefined {

        if (

            !this.activeWindowId

        ) {

            return;

        }

        return this.windows.get(

            this.activeWindowId

        );

    }

    getWindows(): readonly WindowModel[] {

        return [

            ...this.windows.values()

        ];

    }

}

export const windowRuntime =

    new InstitutionalWindowRuntime();
