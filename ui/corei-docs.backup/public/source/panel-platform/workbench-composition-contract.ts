/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    workbench-composition-contract.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-15 — Workbench Composition Contract
===============================================================================
*/

export interface WorkbenchCompositionContract {

    initialize(): Promise<void>;

    compose(): Promise<void>;

    decompose(): Promise<void>;

    shutdown(): Promise<void>;
}
