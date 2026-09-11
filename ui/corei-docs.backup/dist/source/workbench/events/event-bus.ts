/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-20
 *
 * FILE
 * event-bus.ts
 *
 * PURPOSE
 * Central Workbench Event Bus
 * ============================================================================
 */

import type {

    WorkbenchEvent

} from "./event-contract";

type Listener = (

    event: WorkbenchEvent

) => void;

class EventBus {

    private readonly listeners =

        new Map<string, Set<Listener>>();

    subscribe(

        type: string,

        listener: Listener

    ): () => void {

        if (!this.listeners.has(type)) {

            this.listeners.set(

                type,

                new Set()

            );

        }

        this.listeners.get(type)!.add(

            listener

        );

        return () => {

            this.listeners.get(type)?.delete(

                listener

            );

        };

    }

    publish(

        event: WorkbenchEvent

    ): void {

        this.listeners.get(

            event.type

        )?.forEach(listener =>

            listener(event)

        );

    }

}

export const eventBus =

    new EventBus();
