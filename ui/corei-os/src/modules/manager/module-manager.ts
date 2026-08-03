/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 01
 *
 * File        : module-manager.ts
 * Purpose     : Module Manager
 * =============================================================================
 */

import {
    ModuleRegistry
} from "../registry";

import type {
    Module
} from "../models";

export class ModuleManager {

    register(
        module: Module
    ): void {

        (ModuleRegistry as Module[])
            .push(module);

    }

    getAll():
    readonly Module[] {

        return ModuleRegistry;

    }

}
