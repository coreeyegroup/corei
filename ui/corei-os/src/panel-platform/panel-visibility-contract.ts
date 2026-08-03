/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-visibility-contract.ts

Purpose:
    Institutional Panel Visibility contract.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-09 — Panel Visibility Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Layout

Remarks:
    Contract only.
    Consumes existing platform.
===============================================================================
*/

export interface PanelVisibilityContract {

    initialize(): Promise<void>;

    show(panelId: string): Promise<void>;

    hide(panelId: string): Promise<void>;

    isVisible(panelId: string): boolean;

    shutdown(): Promise<void>;
}
