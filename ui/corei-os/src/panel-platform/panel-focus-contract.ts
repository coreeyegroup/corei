/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-focus-contract.ts

Purpose:
    Institutional Panel Focus contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-10 — Panel Focus & Activation Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Visibility

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelFocusContract {

    initialize(): Promise<void>;

    activate(panelId: string): Promise<void>;

    deactivate(panelId: string): Promise<void>;

    getActivePanel(): string | null;

    shutdown(): Promise<void>;
}
