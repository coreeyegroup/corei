/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 05.03
 *
 * File        : runtime-registry.ts
 * Purpose     : Authoritative Platform Runtime Registry.
 * =============================================================================
 */

import type { RuntimeController } from "../controller/runtime-controller";

class RuntimeRegistry {

    private runtime: RuntimeController | null = null;

    /**
     * Registers the platform runtime.
     */
    public register(
        runtime: RuntimeController
    ): void {

        this.runtime = runtime;

    }

    /**
     * Returns the active runtime.
     */
    public get(): RuntimeController {

        if (!this.runtime) {

            throw new Error(
                "Platform Runtime has not been registered."
            );

        }

        return this.runtime;

    }

    /**
     * Returns whether the runtime has been registered.
     */
    public isRegistered(): boolean {

        return this.runtime !== null;

    }

    /**
     * Clears the runtime registry.
     */
    public clear(): void {

        this.runtime = null;

    }

}

export const runtimeRegistry =
    new RuntimeRegistry();
