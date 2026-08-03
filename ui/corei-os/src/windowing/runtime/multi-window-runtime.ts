/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-09
 * Build Unit : BU-001
 * File       : multi-window-runtime.ts
 * Purpose    : Institutional Multi Window Runtime
 * =============================================================================
 */

import type {

    WindowModel

} from "../models/window";

import {

    windowLifecycle

} from "../lifecycle/window-lifecycle";

export interface MultiWindowRuntime {

    initialize(): void;

    open(

        window: WindowModel

    ): void;

    close(

        id: string

    ): void;

    activate(

        id: string

    ): void;

    deactivate(

        id: string

    ): void;

    getWindows(): readonly WindowModel[];

    getActiveWindow(): WindowModel | undefined;

}

class InstitutionalMultiWindowRuntime
implements MultiWindowRuntime {

    private initialized = false;

    initialize(): void {

        if (

            this.initialized

        ) {

            return;

        }

        this.initialized = true;

    }

    open(

        window: WindowModel

    ): void {

        windowLifecycle.register(

            window

        );

        windowLifecycle.activate(

            window.id

        );

    }

    close(

        id: string

    ): void {

        windowLifecycle.unregister(

            id

        );

    }

    activate(

        id: string

    ): void {

        windowLifecycle.activate(

            id

        );

    }

    deactivate(

        id: string

    ): void {

        windowLifecycle.deactivate(

            id

        );

    }

    getWindows(): readonly WindowModel[] {

        return windowLifecycle.getWindows();

    }

    getActiveWindow(): WindowModel | undefined {

        return windowLifecycle.getActiveWindow();

    }

}

export const multiWindowRuntime =

    new InstitutionalMultiWindowRuntime();