/**
 * =============================================================================
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-07
 *
 * FILE:
 * interaction.ts
 *
 * PURPOSE:
 * Authoritative Interaction Visual Language
 *
 * =============================================================================
 */

export const InteractionTokens = Object.freeze({

    state: {

        default: "interaction-default",

        hover: "interaction-hover",

        active: "interaction-active",

        selected: "interaction-selected",

        focus: "interaction-focus",

        disabled: "interaction-disabled"

    },

    transition: {

        fast: "interaction-transition-fast",

        standard: "interaction-transition-standard"

    },

    cursor: {

        interactive: "cursor-interactive",

        disabled: "cursor-disabled"

    }

} as const);


export type InteractionTokensType =
    typeof InteractionTokens;
