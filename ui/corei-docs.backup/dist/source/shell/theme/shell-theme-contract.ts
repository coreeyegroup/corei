/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * shell-theme-contract.ts
 *
 * PURPOSE:
 * Institutional Shell Theme Consumption Contract
 *
 * DESCRIPTION:
 * Defines shell consumption boundary for Foundation Theme Platform.
 *
 * Shell does not own theme creation.
 * Shell consumes existing Foundation theme capabilities.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

export interface ShellThemeContract {

    readonly theme: string;

    readonly density: string;

    readonly surface: string;

}
