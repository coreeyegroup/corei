/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 *
 * File        : validation-manager.ts
 * Purpose     : Architecture Validation Manager
 * =============================================================================
 */

import type {

    ValidationModel

} from "./validation-model";

import {

    ValidationRegistry

} from "./validation-registry";

export class ValidationManager {

    public getAll(): readonly ValidationModel[] {

        return ValidationRegistry;

    }

    public find(

        id: string

    ): ValidationModel | undefined {

        return ValidationRegistry.find(

            validation => validation.id === id

        );

    }

}
