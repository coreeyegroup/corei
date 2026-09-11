/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.04
 *
 * File        : state-manager.ts
 * Purpose     : Generic Platform State Manager.
 * =============================================================================
 */

import type { StateContract } from "../contracts/state-contract";
import type { StateContext } from "../context/state-context";
import { PlatformState } from "../state/platform-state";

/**
 * ============================================================================
 * Generic Platform State Manager
 * ============================================================================
 */
export class StateManager<T>
implements StateContract<T> {

    private value: T;

    private readonly defaultValue: T;

    private readonly context: StateContext;

    constructor(

        id: string,

        name: string,

        initialValue: T

    ) {

        this.defaultValue = initialValue;

        this.value = initialValue;

        this.context = {

            id,

            name,

            state: PlatformState.CREATED,

            createdAt: new Date()

        };

    }

    /**
     * Initializes the platform state.
     */
    public initialize(): void {

        this.context.state =
            PlatformState.INITIALIZED;

    }

    /**
     * Returns the current value.
     */
    public get(): T {

        return this.value;

    }

    /**
     * Updates the state value.
     */
    public set(

        value: T

    ): void {

        this.value = value;

        this.context.state =
            PlatformState.ACTIVE;

    }

    /**
     * Restores the default value.
     */
    public reset(): void {

        this.value = this.defaultValue;

        this.context.state =
            PlatformState.INITIALIZED;

    }

    /**
     * Returns the execution context.
     */
    public getContext(): StateContext {

        return this.context;

    }

}
