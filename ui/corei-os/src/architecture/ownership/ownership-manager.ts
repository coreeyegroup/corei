/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 10
 *
 * File        : ownership-manager.ts
 * Purpose     : Repository Ownership Manager
 * =============================================================================
 */

import type { OwnershipModel } from "./ownership-model";

import { OwnershipRegistry } from "./ownership-registry";

export class OwnershipManager {

    public getAll(): readonly OwnershipModel[] {

        return OwnershipRegistry;

    }

    public find(

        module: string

    ): OwnershipModel | undefined {

        return OwnershipRegistry.find(

            ownership => ownership.module === module

        );

    }

    public findByLayer(

        layer: string

    ): readonly OwnershipModel[] {

        return OwnershipRegistry.filter(

            ownership => ownership.layer === layer

        );

    }

}
