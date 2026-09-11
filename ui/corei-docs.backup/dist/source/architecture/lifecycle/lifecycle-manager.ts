/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 06
 *
 * File        : lifecycle-manager.ts
 * Purpose     : Architecture Lifecycle Manager
 * =============================================================================
 */

import type {

    LifecycleModel

} from "./lifecycle-model";

import {

    LifecycleRegistry

} from "./lifecycle-registry";

export class LifecycleManager {

    public getAll(): readonly LifecycleModel[] {

        return LifecycleRegistry;

    }

    public find(

        id: string

    ): LifecycleModel | undefined {

        return LifecycleRegistry.find(

            lifecycle => lifecycle.id === id

        );

    }

}
