/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : service-registry.ts
 * Purpose    : Institutional Service Registry
 * =============================================================================
 */

import type {

    ServiceModel

} from "../models/service";

export class ServiceRegistry {

    private readonly services = new Map<string, ServiceModel>();

    register(

        service: ServiceModel

    ): void {

        this.services.set(

            service.id,

            service

        );

    }

    get(

        id: string

    ): ServiceModel | undefined {

        return this.services.get(id);

    }

    all(): readonly ServiceModel[] {

        return [...this.services.values()];

    }

}

export const RuntimeServiceRegistry = new ServiceRegistry();
