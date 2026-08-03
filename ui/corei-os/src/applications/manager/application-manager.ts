/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 01
 *
 * File        : application-manager.ts
 * Purpose     : Application Manager
 * =============================================================================
 */

import type {
    ApplicationModel
} from "../models/application";

import {
    ApplicationRegistry
} from "../registry/application-registry";

export class ApplicationManager {

    register(
        application: ApplicationModel
    ): void {

        (
            ApplicationRegistry as ApplicationModel[]
        ).push(application);

    }

    getAll():
    readonly ApplicationModel[] {

        return ApplicationRegistry;

    }

    getById(
        id: string
    ): ApplicationModel | undefined {

        return ApplicationRegistry.find(
            application => application.id === id
        );

    }

}
