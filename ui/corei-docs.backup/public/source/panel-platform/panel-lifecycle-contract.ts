/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-lifecycle-contract.ts

Purpose:
    Institutional Panel Lifecycle contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-05 — Panel Lifecycle Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Registry
    Panel Runtime

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelLifecycleContract {

    create(panelId: string): Promise<void>;

    open(panelId: string): Promise<void>;

    activate(panelId: string): Promise<void>;

    deactivate(panelId: string): Promise<void>;

    hide(panelId: string): Promise<void>;

    show(panelId: string): Promise<void>;

    close(panelId: string): Promise<void>;

    dispose(panelId: string): Promise<void>;
}
