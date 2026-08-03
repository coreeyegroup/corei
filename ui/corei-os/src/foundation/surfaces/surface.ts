/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-06
 *
 * FILE:
 * surface.ts
 *
 * PURPOSE:
 * Authoritative Operational Surface Visual Language
 *
 * =============================================================================
 */

export const SurfaceTokens = Object.freeze({

    surface: {

        base: "surface-base",

        panel: "surface-panel",

        elevated: "surface-elevated",

        overlay: "surface-overlay"

    },

    border: {

        subtle: "border-subtle",

        default: "border-default",

        strong: "border-strong"

    },

    density: {

        compact: "density-compact",

        standard: "density-standard",

        spacious: "density-spacious"

    },

    state: {

        default: "state-default",

        active: "state-active",

        warning: "state-warning",

        critical: "state-critical",

        disabled: "state-disabled"

    }

} as const);


export type SurfaceTokensType =
    typeof SurfaceTokens;
