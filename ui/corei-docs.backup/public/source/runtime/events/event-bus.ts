/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : event-bus.ts
 * Purpose    : Institutional Event Bus
 * =============================================================================
 */

import type {

    EventModel

} from "../models/event";

type EventListener = (

    event: EventModel

) => void;

export class EventBus {

    private readonly listeners: EventListener[] = [];

    subscribe(

        listener: EventListener

    ): void {

        this.listeners.push(listener);

    }

    publish(

        event: EventModel

    ): void {

        this.listeners.forEach(

            (listener) => listener(event)

        );

    }

}

export const RuntimeEventBus = new EventBus();
