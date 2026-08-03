/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 01
 *
 * File        : engine-manager.ts
 * Purpose     : Engine Manager
 * =============================================================================
 */

import {
    EngineRegistry,
    registerEngine
} from "../registry";

import type {
    Engine
} from "../models";

export class EngineManager {

    register(
        engine: Engine
    ): void {

        registerEngine(engine);

    }

    getAll():
    readonly Engine[] {

        return EngineRegistry;

    }

}
