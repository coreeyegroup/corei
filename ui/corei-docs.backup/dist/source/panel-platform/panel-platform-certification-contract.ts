/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-platform-certification-contract.ts

Purpose:
    Institutional certification contract for the completed Panel Platform.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-21 — Certification, Freeze & Consumption Handoff

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform Integration

Remarks:
    Certification only.
===============================================================================
*/

export interface PanelPlatformCertificationContract {

    certify(): Promise<boolean>;

    freeze(): Promise<boolean>;

    handoff(): Promise<boolean>;
}
