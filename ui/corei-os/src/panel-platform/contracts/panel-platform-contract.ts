/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-platform-contract.ts

Purpose:
    Institutional contract boundary for the Panel Platform.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-02 — Panel Platform Contract Boundary

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelPlatformContract {

    initialize(): Promise<void>;

    register(panelId: string): Promise<void>;

    unregister(panelId: string): Promise<void>;

    activate(panelId: string): Promise<void>;

    deactivate(panelId: string): Promise<void>;

    show(panelId: string): Promise<void>;

    hide(panelId: string): Promise<void>;

    dispose(panelId: string): Promise<void>;
}
