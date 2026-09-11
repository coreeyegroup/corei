/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.04
 *
 * File        : event-manager.ts
 * Purpose     : Generic Platform Event Manager.
 * =============================================================================
 */

import type { EventContract } from "../contracts/event-contract";
import type { EventContext } from "../context/event-context";
import { EventState } from "../state/event-state";

/**
 * Event Handler
 */
export type EventHandler<T> = (

    payload: T

) => void;

/**
 * ============================================================================
 * Platform Event Manager
 * ============================================================================
 */
export class EventManager<T>
implements EventContract<T> {

    private payload?: T;

    private readonly handlers =

        new Set<EventHandler<T>>();

    private readonly context: EventContext;

    constructor(

        id: string,

        name: string

    ) {

        this.context = {

            id,

            name,

            state: EventState.CREATED,

            createdAt: new Date()

        };

    }

    /**
     * Publish an event.
     */
    public publish(

        payload: T

    ): void {

        this.payload = payload;

        this.context.state =

            EventState.PUBLISHED;

        for (

            const handler

            of this.handlers

        ) {

            handler(

                payload

            );

        }

        this.context.state =

            EventState.PROCESSED;

    }

    /**
     * Subscribe.
     */
    public subscribe(

        handler: EventHandler<T>

    ): void {

        this.handlers.add(

            handler

        );

    }

    /**
     * Unsubscribe.
     */
    public unsubscribe(

        handler: EventHandler<T>

    ): void {

        this.handlers.delete(

            handler

        );

    }

    /**
     * Latest payload.
     */
    public get():

    T | undefined {

        return this.payload;

    }

    /**
     * Clear payload.
     */
    public clear(): void {

        this.payload = undefined;

        this.context.state =

            EventState.CREATED;

    }

    /**
     * Event Context.
     */
    public getContext():

    EventContext {

        return this.context;

    }

}
