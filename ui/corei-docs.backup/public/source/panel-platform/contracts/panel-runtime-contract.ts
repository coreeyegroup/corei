/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-runtime-contract.ts

Purpose:
    Institutional runtime contract for panel coordination.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-02

Remarks:
    Contract only.
===============================================================================
*/

export interface PanelRuntimeContract {

    start(): Promise<void>;

    stop(): Promise<void>;

    reset(): Promise<void>;

    shutdown(): Promise<void>;
}
