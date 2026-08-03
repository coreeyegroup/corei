/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-registry-contract.ts

Purpose:
    Institutional Panel Registry contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-03 — Panel Registry Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
===============================================================================
*/

export interface PanelRegistryContract {

    register(panelId: string): Promise<void>;

    unregister(panelId: string): Promise<void>;

    exists(panelId: string): boolean;

    get(panelId: string): string | null;

    getAll(): readonly string[];
}
