/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.04
 *
 * File        : extension-manager.ts
 * Purpose     : Generic Platform Extension Manager.
 * =============================================================================
 */

import type { ExtensionContract } from "../contracts/extension-contract";
import type { ExtensionContext } from "../context/extension-context";
import { ExtensionState } from "../state/extension-state";

/**
 * ============================================================================
 * Platform Extension Manager
 * ============================================================================
 */
export class ExtensionManager
implements ExtensionContract {

    private readonly context: ExtensionContext;

    constructor(

        id: string,

        name: string

    ) {

        this.context = {

            id,

            name,

            state: ExtensionState.REGISTERED,

            createdAt: new Date()

        };

    }

    /**
     * Loads the extension.
     */
    public load(): void {

        this.context.state =
            ExtensionState.LOADED;

    }

    /**
     * Initializes the extension.
     */
    public initialize(): void {

        this.context.state =
            ExtensionState.INITIALIZED;

    }

    /**
     * Activates the extension.
     */
    public activate(): void {

        this.context.state =
            ExtensionState.ACTIVE;

    }

    /**
     * Deactivates the extension.
     */
    public deactivate(): void {

        this.context.state =
            ExtensionState.INACTIVE;

    }

    /**
     * Unloads the extension.
     */
    public unload(): void {

        this.context.state =
            ExtensionState.UNLOADED;

    }

    /**
     * Returns the Extension Context.
     */
    public getContext(): ExtensionContext {

        return this.context;

    }

}
