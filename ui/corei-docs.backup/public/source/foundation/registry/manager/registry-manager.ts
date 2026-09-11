/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.04
 *
 * File        : registry-manager.ts
 * Purpose     : Generic institutional Registry Manager.
 * =============================================================================
 */

import type { RegistryContract } from "../contracts/registry-contract";
import type { RegistryContext } from "../context/registry-context";
import { RegistryState } from "../state/registry-state";

/**
 * ============================================================================
 * Generic Registry Manager
 * ============================================================================
 */
export class RegistryManager<T>
implements RegistryContract<T> {

    private readonly entries =
        new Map<string, T>();

    private readonly context: RegistryContext;

    constructor(

        id: string,

        name: string

    ) {

        this.context = {

            id,

            name,

            state: RegistryState.CREATED,

            createdAt: new Date()

        };

    }

    /**
     * Initializes the registry.
     */
    public initialize(): void {

        this.context.state =
            RegistryState.INITIALIZED;

    }

    /**
     * Registers an item.
     */
    public register(

        id: string,

        value: T

    ): void {

        this.entries.set(

            id,

            value

        );

        this.context.state =
            RegistryState.ACTIVE;

    }

    /**
     * Returns an item.
     */
    public get(

        id: string

    ): T | undefined {

        return this.entries.get(

            id

        );

    }

    /**
     * Returns all items.
     */
    public list(): T[] {

        return [

            ...this.entries.values()

        ];

    }

    /**
     * Removes an item.
     */
    public unregister(

        id: string

    ): void {

        this.entries.delete(

            id

        );

    }

    /**
     * Clears the registry.
     */
    public clear(): void {

        this.entries.clear();

        this.context.state =
            RegistryState.DISPOSED;

    }

    /**
     * Returns the registry context.
     */
    public getContext(): RegistryContext {

        return this.context;

    }

}
