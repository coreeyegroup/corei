/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-10
 * Build Unit : 02
 * File       : monitor.ts
 * Purpose    : Institutional Monitor Model
 * =============================================================================
 */

export interface MonitorModel {

    readonly id: string;

    readonly name: string;

    readonly initialized: boolean;

    readonly attached: boolean;

    readonly active: boolean;

}
