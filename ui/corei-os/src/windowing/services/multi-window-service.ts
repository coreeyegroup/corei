/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-09
 * Build Unit : BU-002
 * File       : multi-window-service.ts
 * Purpose    : Institutional Multi Window Service
 * =============================================================================
 */

import type {

    WindowModel

} from "../models/window";

import {

    multiWindowRuntime

} from "../runtime/multi-window-runtime";

import {

    multiWindowRegistry

} from "../registry/multi-window-registry";

import {

    loadWindows,
    saveWindows

} from "../persistence/window-persistence";

export interface MultiWindowService {

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

    restore(): void;

    persist(): void;

    closeAll(): void;

    activateAll(): void;

    deactivateAll(): void;

    getWindows(): readonly WindowModel[];

    getActiveWindow(): WindowModel | undefined;

}

class InstitutionalMultiWindowService
implements MultiWindowService {

    initialize(): void {

        multiWindowRuntime.initialize();

    }

    open(

        window: WindowModel

    ): void {

        multiWindowRegistry.register(

            window

        );

        multiWindowRuntime.open(

            window

        );

        this.persist();

    }

    close(

        id: string

    ): void {

        multiWindowRuntime.close(

            id

        );

        multiWindowRegistry.unregister(

            id

        );

        this.persist();

    }

    activate(

        id: string

    ): void {

        multiWindowRuntime.activate(

            id

        );

    }

    deactivate(

        id: string

    ): void {

        multiWindowRuntime.deactivate(

            id

        );

    }

    restore(): void {

        loadWindows();

    }

    persist(): void {

        saveWindows();

    }

    closeAll(): void {

        for (

            const window of

            multiWindowRegistry.getAll()

        ) {

            multiWindowRuntime.close(

                window.id

            );

        }

        multiWindowRegistry.clear();

        this.persist();

    }

    activateAll(): void {

        for (

            const window of

            multiWindowRegistry.getAll()

        ) {

            multiWindowRuntime.activate(

                window.id

            );

        }

    }

    deactivateAll(): void {

        for (

            const window of

            multiWindowRegistry.getAll()

        ) {

            multiWindowRuntime.deactivate(

                window.id

            );

        }

    }

    getWindows(): readonly WindowModel[] {

        return multiWindowRegistry.getAll();

    }

    getActiveWindow(): WindowModel | undefined {

        return multiWindowRuntime.getActiveWindow();

    }

}

export const multiWindowService =

    new InstitutionalMultiWindowService();
