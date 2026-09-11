/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.05
 *
 * File        : event-service.ts
 * Purpose     : Authoritative platform event service.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

type EventHandler<T = unknown> = (payload: T) => void;

export class EventService implements PlatformService {

    public readonly id = "event-service";

    private readonly handlers =
        new Map<string, Set<EventHandler>>();

    public initialize(): void {

        console.info("[COREI] Event Service Initialized");

    }

    public dispose(): void {

        this.handlers.clear();

        console.info("[COREI] Event Service Disposed");

    }

    public subscribe<T = unknown>(
        event: string,
        handler: EventHandler<T>
    ): void {

        if (!this.handlers.has(event)) {

            this.handlers.set(
                event,
                new Set()
            );

        }

        this.handlers.get(event)!.add(
            handler as EventHandler
        );

    }

    public publish<T = unknown>(
        event: string,
        payload: T
    ): void {

        const handlers =
            this.handlers.get(event);

        if (!handlers) {

            return;

        }

        for (const handler of handlers) {

            handler(payload);

        }

    }

}

export const eventService =
    new EventService();
