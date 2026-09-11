/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-host-contract.ts

Purpose:
    Institutional Panel Host contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-06 — Panel Host Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Registry
    Panel Runtime
    Panel Lifecycle

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelHostContract {

    initialize(): Promise<void>;

    attach(panelId: string): Promise<void>;

    detach(panelId: string): Promise<void>;

    activate(panelId: string): Promise<void>;

    deactivate(panelId: string): Promise<void>;

    shutdown(): Promise<void>;
}
