/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 01
 *
 * File        : experience-manager.ts
 * Purpose     : Experience Manager
 * =============================================================================
 */

import type {
    ExperienceModel
} from "../models/experience";

import {
    ExperienceRegistry
} from "../registry/experience-registry";

export class ExperienceManager {

    public register(
        experience: ExperienceModel
    ): void {

        (
            ExperienceRegistry as ExperienceModel[]
        ).push(experience);

    }

    public getAll():
    readonly ExperienceModel[] {

        return ExperienceRegistry;

    }

}
