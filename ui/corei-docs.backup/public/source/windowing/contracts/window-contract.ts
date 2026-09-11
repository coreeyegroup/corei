/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-08
 * Build Unit : BU-001
 * File       : window-contract.ts
 * Purpose    : Institutional Window Contract
 * =============================================================================
 */

export type WindowId = string;

export type WindowMode =

    | "docked"
    | "floating";

export interface WindowBounds {

    readonly x: number;

    readonly y: number;

    readonly width: number;

    readonly height: number;

}

export interface WindowContract {

    readonly id: WindowId;

    readonly title: string;

    readonly visible: boolean;

    readonly active: boolean;

    readonly mode: WindowMode;

    readonly bounds: WindowBounds;

}
