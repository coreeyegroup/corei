/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-productivity-platform-certification-contract.ts

Purpose:
    Institutional certification contract for the completed
    Operator Productivity Platform.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-20 — Certification, Freeze & Consumption Handoff

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Capability Provider Platform
    Window & Workspace Platform
    Panel Platform
    Operator Productivity Platform Integration

Remarks:
    Certification only.
===============================================================================
*/

export interface OperatorProductivityPlatformCertificationContract {

    certify(): Promise<boolean>;

    freeze(): Promise<boolean>;

    handoff(): Promise<boolean>;
}
