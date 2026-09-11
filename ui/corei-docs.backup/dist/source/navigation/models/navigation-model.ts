/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * navigation-model.ts
 *
 * PURPOSE:
 * Institutional Navigation Model
 *
 * DESCRIPTION:
 * Runtime model for the navigation subsystem.
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import type { NavigationContract } from "../contracts/navigation-contract";

/*=============================================================================
    NAVIGATION MODEL
=============================================================================*/

export interface NavigationModel {

    readonly initialized: boolean;

    readonly navigation: NavigationContract;

}
