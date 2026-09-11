/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-descriptor.ts
 *
 * PURPOSE:
 * Institutional Shell Descriptor
 *
 ******************************************************************************/

export interface ShellDescriptor {

    readonly id: string;

    readonly name: string;

    readonly displayName: string;

    readonly version: string;

    readonly description: string;

    readonly owner: string;

    readonly stage: number;

    readonly phase: number;

    readonly step: number;

}
