/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-04
 * Build Unit : BU-002
 * File       : window-registry.ts
 * Purpose    : Institutional Window Registry
 * =============================================================================
 */

import type {

    WindowModel

} from "../models/window";

export interface WindowRegistryContract {

    register(

        window: WindowModel

    ): void;

    unregister(

        id: string

    ): void;

    exists(

        id: string

    ): boolean;

    get(

        id: string

    ): WindowModel | undefined;

    getAll(): readonly WindowModel[];

    clear(): void;

}

class InstitutionalWindowRegistry
implements WindowRegistryContract {

    private readonly windows =

        new Map<string, WindowModel>();

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

    }

    exists(

        id: string

    ): boolean {

        return this.windows.has(

            id

        );

    }

    get(

        id: string

    ): WindowModel | undefined {

        return this.windows.get(

            id

        );

    }

    getAll(): readonly WindowModel[] {

        return [

            ...this.windows.values()

        ];

    }

    clear(): void {

        this.windows.clear();

    }

}

export const windowRegistry =

    new InstitutionalWindowRegistry();
