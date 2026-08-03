/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-runtime-contract.ts

Purpose:
    Institutional Command Runtime contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-02

Owner:
    COREI Platform Architecture

Remarks:
    Contract only.
===============================================================================
*/

export interface CommandRuntimeContract {

    initialize(): Promise<void>;

    start(): Promise<void>;

    stop(): Promise<void>;

    reset(): Promise<void>;

    shutdown(): Promise<void>;
}
