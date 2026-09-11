/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 07
 *
 * File        : standards-manager.ts
 * Purpose     : Architecture Standards Manager
 * =============================================================================
 */

import type {

    StandardsModel

} from "./standards-model";

import {

    StandardsRegistry

} from "./standards-registry";

export class StandardsManager {

    public getAll(): readonly StandardsModel[] {

        return StandardsRegistry;

    }

    public find(

        id: string

    ): StandardsModel | undefined {

        return StandardsRegistry.find(

            rule => rule.id === id

        );

    }

}
