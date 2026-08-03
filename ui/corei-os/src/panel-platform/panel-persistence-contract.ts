/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-persistence-contract.ts

Purpose:
    Institutional Panel Persistence contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-12 — Panel Persistence Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel State

Remarks:
    Contract only.
    Consumes existing persistence.
===============================================================================
*/

export interface PanelPersistenceContract {

    initialize(): Promise<void>;

    save(panelId: string): Promise<void>;

    restore(panelId: string): Promise<void>;

    remove(panelId: string): Promise<void>;

    shutdown(): Promise<void>;
}
