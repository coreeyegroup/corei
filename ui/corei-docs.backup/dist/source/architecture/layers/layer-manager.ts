/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 03
 *
 * File        : layer-manager.ts
 * Purpose     : Platform Layer Manager
 * =============================================================================
 */

import type { LayerModel } from "./layer-model";

import { LayerRegistry } from "./layer-registry";

export class LayerManager {

    public getAll(): readonly LayerModel[] {

        return LayerRegistry;

    }

    public find(

        id: string

    ): LayerModel | undefined {

        return LayerRegistry.find(

            layer => layer.id === id

        );

    }

}
