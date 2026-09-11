/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 01
 *
 * File        : service-manager.ts
 * Purpose     : Service Manager
 * =============================================================================
 */

import type {
    ServiceModel
} from "../models";

import {
    ServiceRegistry
} from "../registry/service-registry";

export class ServiceManager {

    register(
        service: ServiceModel
    ): void {

        (
            ServiceRegistry as ServiceModel[]
        ).push(service);

    }

    getAll():
    readonly ServiceModel[] {

        return ServiceRegistry;

    }

}
