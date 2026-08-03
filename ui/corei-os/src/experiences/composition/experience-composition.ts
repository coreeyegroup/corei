/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 04
 *
 * File        : experience-composition.ts
 * Purpose     : Experience Composition
 * =============================================================================
 */

import type {
    ExperienceWorkspaceBinding
} from "./experience-workspace-binding";

import type {
    ExperienceCapabilityBinding
} from "./experience-capability-binding";

import type {
    ExperienceProviderBinding
} from "./experience-provider-binding";

export interface ExperienceComposition {

    readonly workspaces:
        readonly ExperienceWorkspaceBinding[];

    readonly capabilities:
        readonly ExperienceCapabilityBinding[];

    readonly providers:
        readonly ExperienceProviderBinding[];

}
