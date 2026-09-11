/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.08
 *
 * File        : service-container.ts
 * Purpose     : Authoritative Platform Service Container.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

import { serviceRegistry } from "../registry/service-registry";

import { loggingService } from "../logging/logging-service";
import { eventService } from "../events/event-service";
import { notificationService } from "../notifications/notification-service";
import { diagnosticsService } from "../diagnostics/diagnostics-service";

class ServiceContainer {

    constructor() {

        this.register(loggingService);
        this.register(eventService);
        this.register(notificationService);
        this.register(diagnosticsService);

    }

    public register(
        service: PlatformService
    ): void {

        serviceRegistry.register(service);

    }

    public initialize(): void {

        console.group("[COREI] Platform Services");

        for (const service of serviceRegistry.list()) {

            console.info(`Initializing : ${service.id}`);

            service.initialize();

        }

        console.groupEnd();

    }

    public dispose(): void {

        console.group("[COREI] Platform Services");

        for (const service of [...serviceRegistry.list()].reverse()) {

            console.info(`Disposing : ${service.id}`);

            service.dispose();

        }

        console.groupEnd();

    }

}

export const serviceContainer =
    new ServiceContainer();
