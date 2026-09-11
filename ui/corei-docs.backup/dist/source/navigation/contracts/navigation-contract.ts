/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * navigation-contract.ts
 *
 * PURPOSE:
 * Institutional Navigation Contracts
 *
 * DESCRIPTION:
 * Defines the navigation ownership contracts for the COREI
 * Operating System navigation subsystem.
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

/*=============================================================================
    NAVIGATION ITEM
=============================================================================*/

export interface NavigationItemContract {

    readonly id: string;

    readonly title: string;

    readonly icon?: string;

    readonly route: string;

    readonly visible: boolean;

    readonly order: number;

}

/*=============================================================================
    NAVIGATION GROUP
=============================================================================*/

export interface NavigationGroupContract {

    readonly id: string;

    readonly title: string;

    readonly expanded: boolean;

    readonly items: readonly NavigationItemContract[];

}

/*=============================================================================
    NAVIGATION ROOT
=============================================================================*/

export interface NavigationContract {

    readonly groups: readonly NavigationGroupContract[];

}
