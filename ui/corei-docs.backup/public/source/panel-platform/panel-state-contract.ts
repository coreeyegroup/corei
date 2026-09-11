/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-state-contract.ts

Purpose:
    Institutional Panel State contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-11 — Panel State Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Focus

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelStateContract {

    initialize(): Promise<void>;

    setState(
        panelId: string,
        state: unknown
    ): Promise<void>;

    getState(
        panelId: string
    ): unknown;

    hasState(
        panelId: string
    ): boolean;

    clearState(
        panelId: string
    ): Promise<void>;

    shutdown(): Promise<void>;
}
