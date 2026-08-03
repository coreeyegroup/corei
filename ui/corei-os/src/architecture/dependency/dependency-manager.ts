/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 05
 *
 * File        : dependency-manager.ts
 * Purpose     : Architecture Dependency Manager
 * =============================================================================
 */

import type {

    DependencyModel

} from "./dependency-model";

import {

    DependencyRegistry

} from "./dependency-registry";

export class DependencyManager {

    public getAll(): readonly DependencyModel[] {

        return DependencyRegistry;

    }

    public isAllowed(

        source: string,

        target: string

    ): boolean {

        return DependencyRegistry.some(

            dependency =>

                dependency.source === source &&

                dependency.target === target &&

                dependency.allowed

        );

    }

}
