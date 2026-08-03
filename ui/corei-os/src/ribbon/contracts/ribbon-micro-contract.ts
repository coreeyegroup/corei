/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-16
 *
 * FILE:
 * ribbon-micro-contract.ts
 *
 * PURPOSE:
 * Institutional Ribbon Micro Interaction Contract
 *
 * DESCRIPTION:
 * Defines deterministic presentation contracts for Ribbon groups, actions,
 * status surfaces and contextual controls.
 *
 * This contract owns Ribbon presentation semantics only.
 *
 * It does not own:
 *
 * - Shell command routing,
 * - application command execution,
 * - Platform Kernel state,
 * - authentication,
 * - authorization,
 * - persistence,
 * - runtime health discovery,
 * - global keyboard command infrastructure.
 *
 * OWNERSHIP:
 * Ribbon presentation boundary
 *
 ******************************************************************************/

export type RibbonActionState =
    | "available"
    | "active"
    | "disabled";

export type RibbonStatusTone =
    | "neutral"
    | "operational"
    | "attention"
    | "critical";

export interface RibbonActionContract {

    readonly id: string;

    readonly label: string;

    readonly shortLabel: string;

    readonly state: RibbonActionState;

    readonly keyboardHint?: string;

}

export interface RibbonGroupContract {

    readonly id: string;

    readonly label: string;

    readonly actions: readonly RibbonActionContract[];

}

export interface RibbonStatusSurfaceContract {

    readonly id: string;

    readonly label: string;

    readonly value: string;

    readonly tone: RibbonStatusTone;

}

export interface RibbonContextualControlContract {

    readonly id: string;

    readonly label: string;

    readonly value: string;

    readonly expanded: boolean;

}

export interface RibbonMicroModelContract {

    readonly groups: readonly RibbonGroupContract[];

    readonly status: RibbonStatusSurfaceContract;

    readonly contextualControl: RibbonContextualControlContract;

}
