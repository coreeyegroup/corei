/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-event-state-contract.ts

Purpose:
    Institutional Productivity Event & State Coordination contract.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-15 — Productivity Event & State Coordination Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Event Platform
    State Platform
    Operator Workflow Composition

Remarks:
    Contract only.
    Consumes existing Kernel services.
===============================================================================
*/

export interface ProductivityEventStateContract {

    initialize(): Promise<void>;

    publish(eventId: string): Promise<void>;

    synchronize(contextId: string): Promise<void>;

    flush(): Promise<void>;

    shutdown(): Promise<void>;
}
