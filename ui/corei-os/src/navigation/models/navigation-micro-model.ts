/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * navigation-micro-model.ts
 *
 * PURPOSE:
 * Navigation Micro Presentation Model
 *
 * DESCRIPTION:
 * Defines presentation-only metadata used by the institutional Navigation
 * micro surface.
 *
 * Runtime navigation identity and activation remain owned by the existing
 * Navigation registry and Navigation state.
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

export interface NavigationMicroMetadata {

    readonly eyebrow: string;

    readonly mark?: string;

    readonly title: string;

    readonly description: string;

    readonly searchPlaceholder: string;

    readonly groupLabel: string;

    readonly footerLabel: string;

}

export const DEFAULT_NAVIGATION_MICRO_METADATA:
    Readonly<NavigationMicroMetadata> = {

        eyebrow: "COREI OS",

        mark: "",

        title: "Operating Domains",

        description: "Institutional control surfaces",

        searchPlaceholder: "Filter domains",

        groupLabel: "Primary",

        footerLabel: "Platform Navigation"

    };
