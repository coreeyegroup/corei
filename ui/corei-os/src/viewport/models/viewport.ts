/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.02
 *
 * File        : viewport.ts
 * Purpose     : Institutional Viewport Model
 * =============================================================================
 */

export interface ViewportModel {

    readonly id: string;

    readonly name: string;

    readonly initialized: boolean;

    readonly attached: boolean;

}
